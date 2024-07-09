import express from "express";
import db from "./../utils/connect.js";
import moment from "moment-timezone";

const router = express.Router();
const dateFormat = "YYYY-MM-DD";

// GET orders data
router.get("/", async (req, res) => {
  // 從 query 中取得 member_id, order_status_id
  const { member_id, order_status_id } = req.query;

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
      WHERE o.member_id = ? AND o.order_status_id = ?
      GROUP BY o.id;
    `;

    const [orders] = await db.query(orderSql, [member_id, order_status_id]);

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
        img.product_img
      FROM order_details od
      LEFT JOIN (
        SELECT img_product_id, product_img,
          ROW_NUMBER() OVER (PARTITION BY img_product_id ORDER BY img_id) AS rn
        FROM product_img
      ) img ON img.img_product_id = od.order_product_id AND img.rn = 1
      WHERE od.order_id IN (SELECT id FROM orders WHERE member_id = ? AND order_status_id = ?);
    `;

    const [orderDetails] = await db.query(orderDetailsSql, [
      member_id,
      order_status_id,
    ]);

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

// GET order_details data
router.get("/:orderId", async (req, res) => {
  // 從 query 中取得 orderId
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

    // 取得訂單詳細資料
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
      orders,
      orderDetails,
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET order_reviews data
router.get("/api/reviews/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // 取得評價資料
    const sql = `
    SELECT
      o.id order_id,
      u.name,
      u.nick_name,
      od.order_product_id,
      pm.product_name,
      (
          SELECT pi.product_img
          FROM product_img pi
          WHERE pi.img_product_id = od.order_product_id
          LIMIT 1
      ) product_img,
      od.review,
      od.rate,
      od.review_status,
      od.review_date
    FROM order_details od
    LEFT JOIN orders o ON o.id = od.order_id
    LEFT JOIN users u ON u.user_id = o.member_id
    LEFT JOIN product_management pm ON pm.product_id = od.order_product_id
    WHERE o.id = ?
    `;

    const [rows] = await db.query(sql, [orderId]);

    rows.forEach((r) => {
      const m = moment(r.created_at);
      if (m.isValid()) {
        r.created_at = m.format(dateFormat);
      } else {
        r.created_at = "無訂單日期";
      }
    });

    console.log("orders reviews: ", rows);

    const success = !!rows.length;

    // 將查詢結果傳送到前端
    res.json({
      success,
      rows,
    });
  } catch (error) {
    console.error("Error fetching order reviews: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST order_reviews data
router.post("/api/add-reviews", async (req, res) => {
  const reviews = req.body;

  if (!Array.isArray(reviews)) {
    return res.status(400).json({
      success: false,
      message: "Invalid data format.",
    });
  }

  try {
    const sql = `
      UPDATE order_details SET 
        review = ?, 
        rate = ?, 
        review_status = 1,
        review_date = now()
      WHERE order_id = ? AND order_product_id = ?;
    `;

    const reviewPromises = reviews.map(
      ({ review, rate, order_id, order_product_id }) => {
        return db.query(sql, [
          review,
          rate,
          order_id,
          order_product_id,
        ]);
      }
    );

    const results = await Promise.all(reviewPromises);

    const allSuccess = results.every(([result]) => result.affectedRows === 1);

    res.json({
      success: allSuccess,
    });
  } catch (error) {
    console.error("Error while processing add reviews", error);
    res.status(500).json({
      error: "An error occurred while processing add reviews.",
    });
  }
});

// router.post("/api/add-reviews", async (req, res) => {
//   // const { review, rate, content, order_id, order_product_id } = req.body;
//   const body = {...req.body}

//   try {
//     const sql = `
//       UPDATE order_details SET
//         review = ?,
//         rate = ?,
//         content = ?,
//         review_status = 1,
//       WHERE order_id = ? and order_product_id;
//     `;

//     const reviewPromises = body.map(({review, rate, content, order_id, order_product_id})=>{
//       const rows = [
//         review, rate, content, order_id, order_product_id
//       ]
//     }

//     )
//     const [results] = await db.query(sql, [review, rate, content, order_id, order_product_id]);

//     // 確認是否有成功 insert value
//     const success = results.affectedRows === 1;
//     const id = results.insertId;

//     // 返回結果到前端
//     res.json({
//       success,
//       id,
//     });

//   } catch (error) {
//     console.error("Error while processing add reviews", error);
//     res.status(500).json({
//       error: "An error occurred while processing add reviews.",
//     });
//   }
// });

export default router;
