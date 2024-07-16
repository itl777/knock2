import express from "express";
import db from "../utils/connect.js";
import moment from "moment-timezone";

const router = express.Router();
const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
const timeFormat = "HH:mm";

const getPaymentType = (payment_type) => {
  if (!payment_type) {
    return payment_type = "待付款";
  } else {
    // 找到第一個 "_" 的位置
    const underscoreIndex = payment_type.indexOf("_");

    // 如果有找到 "_"，則取 "_" 之前的字串，否則取整個字串
    const prefix =
      underscoreIndex !== -1
        ? payment_type.substring(0, underscoreIndex)
        : payment_type;

    switch (prefix) {
      case "Credit":
        payment_type = "線上刷卡";
        break;
      case "CVS":
        payment_type = "超商付款";
        break;
      case "ATM":
        payment_type = "轉帳";
        break;
      case "WebATM":
        payment_type = "網路銀行";
        break;
      case "BARCODE":
        payment_type = "超商條碼繳款";
        break;
      case "TWQR":
        payment_type = "歐付寶行動支付";
        break;
      default:
        payment_type = "其他付款方式";
        break;
    }

    return payment_type;
  }
  
}


router.get("/", async (req, res) => {
  // 從 query 中取得 member_id, status and page
  const { member_id, status, page=1 } = req.query;
  const perPage = 5; //每頁筆數
  const offset = (page - 1) * perPage;

  try {
    let condition;
    
    switch (status) {
      case "ongoing":
        condition = `r.reservation_date >= now()`;
        break;
      case "complete":
        condition = `r.reservation_date < now()`;
        break;
      case "canceled":
        condition = `r.reservation_status_id = 3`;
        break;
      default:
        return res.status(400).json({ error: "Invalid status parameter" });
    }

    // 取得訂單資料
    let sql;
    let countSql;

    sql = `
      SELECT
        r.reservation_id,
        r.user_id,
        r.branch_themes_id,
        r.participants,
        r.reservation_date,
        r.merchant_trade_no,
        r.payment_type,
        r.payment_date,
        r.reservation_status_id,
        b.branch_name,
        r.branch_themes_id,
        t.theme_name,
        t.theme_img,
        r.reservation_status_id,
        rs.reservation_status_name,
        r.session_id,
        s.start_time,
        s.end_time,
        t.deposit,
        r.created_at
        FROM reservations r
        LEFT JOIN branches b ON b.branch_id = r.branch_themes_id
        JOIN themes t ON t.theme_id = r.branch_themes_id
        JOIN reservation_status rs ON rs.id = r.reservation_status_id
        JOIN sessions s ON s.sessions_id = r.session_id
      WHERE r.user_id = ? AND ${condition}
      ORDER BY r.reservation_date DESC
      LIMIT ?, ?;
    `;

    const [rows] = await db.query(sql, [member_id, offset, perPage]);

    // 格式化 reservation_date
    rows.forEach((v) => {
      const m = moment(v.reservation_date);
      if (m.isValid()) {
        v.reservation_date = m.format(dateFormat);
      } else {
        v.reservation_date = "";
      }
    });

    rows.forEach((v) => {
      const m = moment(v.created_at);
      if (m.isValid()) {
        v.created_at = m.format(dateFormat);
      } else {
        v.created_at = "";
      }
    });

    rows.forEach((v) => {
      const m = moment(v.start_time, "HH:mm:ss");
      if (m.isValid()) {
        v.start_time = m.format(timeFormat);
      } else {
        v.start_time = "";
      }
    });

    rows.forEach((v) => {
      const m = moment(v.end_time, "HH:mm:ss");
      if (m.isValid()) {
        v.end_time = m.format(timeFormat);
      } else {
        v.end_time = "";
      }
    });

    // 格式化 payment_type
    rows.forEach((v) => {
      v.payment_type = getPaymentType(v.payment_type);
    });

    countSql = `
      SELECT COUNT(*) AS count
      FROM reservations r
      WHERE r.user_id = ? AND ${condition};
    `;

    // 獲取總頁數
    const [countResult] = await db.query(countSql, [member_id]);
    const count = countResult[0].count;
    const totalPages = Math.ceil(count / perPage);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      rows,
      perPage,
      offset,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching reservation: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
