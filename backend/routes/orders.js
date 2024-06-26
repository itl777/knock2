import express from "express";
import db from "./../utils/connect.js";
// import moment from 'moment-timezone';

// const dateFormat = 'YYYY-MM-DD';
const router = express.Router();

router.get("/", async (req, res) => {
  const { member_id, order_status_id } = req.query; // 從 query 中取得 member_id, order_status_id

  try {
    // 查詢訂單資料，包括聯接必要的資料表，只撈取指定會員的訂單
    const sql = `
    SELECT 
      o.id AS order_id,
      o.order_date,
      o.customer_order_id,
      o.payment_method,
      CONCAT(c.city_name, d.district_name, o.order_address) AS full_address,
      os.order_status_name,
      GROUP_CONCAT(img.product_img SEPARATOR ',') AS product_imgs, -- 聚合商品圖片路徑
      SUM(od.order_quantity * pm.price) AS total_price
    FROM orders o
    LEFT JOIN order_details od ON o.id = od.order_id
    LEFT JOIN (
        SELECT img_product_id, product_img,
              ROW_NUMBER() OVER (PARTITION BY img_product_id ORDER BY img_id) AS rn
        FROM product_img
    ) img ON img.img_product_id = od.order_product_id AND img.rn = 1
    LEFT JOIN product_management pm ON od.order_product_id = pm.product_id
    LEFT JOIN district d ON o.order_district_id = d.id
    LEFT JOIN city c ON d.city_id = c.id
    LEFT JOIN order_status os ON o.order_status_id = os.id
    WHERE o.member_id = ? AND o.order_status_id = ?
    GROUP BY o.id, o.order_date, o.customer_order_id, o.payment_method, full_address, os.order_status_name;
    `;

    const [orders] = await db.query(sql, [member_id, order_status_id]);

    // 將查詢結果傳送到前端
    res.json({ status: "success", data: orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

// SELECT
// o.id,
// o.order_date,
// o.customer_order_id,
// o.payment_method,
// CONCAT(c.city_name, d.district_name, o.order_address) AS full_address,
// os.order_status_name,
// img.product_img,
// SUM(od.order_quantity * pm.price) AS total_price
// FROM orders o
// LEFT JOIN order_details od ON o.id = od.order_id
// LEFT JOIN product_management pm ON od.order_product_id = pm.product_id
// LEFT JOIN product_img img ON img.img_product_id = pm.product_id
// LEFT JOIN district d ON o.order_district_id = d.id
// LEFT JOIN city c ON d.city_id = c.id
// LEFT JOIN order_status os ON o.order_status_id = os.id
// WHERE o.member_id = ? AND o.order_status_id = ?
// GROUP BY o.id
