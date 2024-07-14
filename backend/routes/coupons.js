import express from "express";
import db from "../utils/connect.js";
import moment from "moment-timezone";

const router = express.Router();
const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

// GET member coupons with pagination and status filter
router.get("/member_coupons", async (req, res) => {
  const { member_id, page = 1 } = req.query;
  const perPage = 5; // 每頁筆數
  const offset = (page - 1) * perPage;
  const now = moment().format(dateTimeFormat);

  try {
    // 取得會員名下的優惠券，使用 valid_until 條件過濾
    const sql = `
      SELECT 
        cm.id,
        cm.coupon_id,
        cm.used_at,
        c.coupon_name,
        c.coupon_type_id,
        c.minimum_order,
        c.discount_amount,
        c.discount_percentage,
        c.valid_from,
        c.valid_until,
        c.max_usage_per_user,
        c.total_limit,
        ct.coupon_type_name
      FROM coupon_member cm
      JOIN coupons c ON c.id = cm.coupon_id
      JOIN coupon_types ct ON ct.id = c.coupon_type_id
      WHERE cm.member_id = ? AND cm.used_at IS NULL AND c.valid_until >= now()
      ORDER BY cm.id DESC
      LIMIT ?, ?;
    `;

    const [coupons] = await db.query(sql, [member_id, offset, perPage]);

    coupons.forEach((r) => {
      const m = moment(r.valid_from);
      if (m.isValid()) {
        r.valid_from = m.format(dateTimeFormat);
      } else {
        r.valid_from = "";
      }
    });

    coupons.forEach((r) => {
      const m = moment(r.valid_until);
      if (m.isValid()) {
        r.valid_until = m.format(dateTimeFormat);
      } else {
        r.valid_until = "";
      }
    });

    // 獲取總頁數
    const countSql = `
      SELECT COUNT(*) AS count
      FROM coupon_member cm
      JOIN coupons c ON c.id = cm.coupon_id
      WHERE cm.member_id = ? AND cm.used_at IS NULL AND c.valid_until >= now()
    `;
    const [countResult] = await db.query(countSql, [member_id]);
    const count = countResult[0].count;
    const totalPages = Math.ceil(count / perPage);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      coupons,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching member coupons: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/coupon_details", async (req, res) => {
  const { coupon_id } = req.query;

  try {
    const sql = `
        SELECT 
        cm.coupon_id,
        c.coupon_type_id,
        ct.coupon_type_name,
        pm.product_id,
        pm.product_name
      FROM coupon_member cm
      JOIN coupons c ON c.id = cm.coupon_id
      JOIN coupon_types ct ON ct.id = c.coupon_type_id
      JOIN coupon_product_associations cpa ON cpa.coupon_id = cm.coupon_id
      JOIN product_management pm ON pm.product_id = cpa.coupon_product_id
      WHERE cm.coupon_id = ?;
    `;

    const [rows] = await db.query(sql, [coupon_id]);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      rows,
    });
  } catch (error) {
    console.error("Error fetching member coupons: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
