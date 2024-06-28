import express from "express";
import db from "../utils/connect.js";
import moment from "moment-timezone";

const router = express.Router();
const dateFormat = "YYYY-MM-DD";

router.get("/details/:orderId", async (req, res) => {
  // 從 query 中取得 member_id, order_status_id
  const orderId = req.params.orderId;

  try {
    // 取得訂單資料
    const orderSql = `
      SELECT 
        o.id AS order_id,
        o.order_date,
        o.customer_order_id,
        o.payment_method,
        CONCAT(c.city_name, d.district_name, o.order_address) AS full_address,
        os.order_status_name,
        SUM(od.order_quantity * pm.price) AS total_price
      FROM orders o
      LEFT JOIN order_details od ON od.order_id = o.id
      LEFT JOIN product_management pm ON pm.product_id = od.order_product_id
      LEFT JOIN district d ON d.id = o.order_district_id
      LEFT JOIN city c ON c.id = d.city_id
      LEFT JOIN order_status os ON os.id = o.order_status_id
      WHERE o.id = ?
      GROUP BY o.id;
    `;

    const [orders] = await db.query(orderSql, [orderId]);

    // 格式化 order_date
    orders.forEach((order) => {
      const m = moment(order.order_date);
      if (m.isValid()) {
        order.order_date = m.format(dateFormat);
      } else {
        order.order_date = "無訂單日期";
      }
    });

    // 取得訂單商品圖片
    const orderDetailsSql = `
      SELECT 
        od.order_id,
        od.order_product_id AS product_id,
        pm.product_name,
        od.order_unit_price,
        od.order_quantity,
        img.product_img
      FROM order_details od
      LEFT JOIN product_management pm ON pm.product_id = od.order_product_id
      LEFT JOIN (
        SELECT img_product_id, product_img,
          ROW_NUMBER() OVER (PARTITION BY img_product_id ORDER BY img_id) AS rn
        FROM product_img
      ) img ON img.img_product_id = od.order_product_id AND img.rn = 1
      WHERE od.order_id = ?
    `;

    const [orderDetails] = await db.query(orderDetailsSql, [orderId]);

    console.log("orders data: ", orders);
    console.log("order details data: ", orderDetails);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      orders: orders,
      orderDetails: orderDetails,
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
