import express from "express";
import db from "./../utils/connect.js";
import moment from "moment-timezone";

const dateFormat = "YYYY-MM-DD";
const router = express.Router();

const getListData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 25; // 每頁最多有幾筆資料
  let page = parseInt(req.query.page) || 1; // 從 query string 最得 page 的值
  if (page < 1) {
    redirect = "?page=1";
    return { success, redirect }; // 跳轉頁面
  }

  let search = req.query.search || "";
  let birth_start = req.query.birth_start || "";
  let birth_end = req.query.birth_end || "";

  let where = " WHERE 1 "; // 1是true的意思，其實有下跟沒下一樣
  if (search) {
    //where += ` AND \`name\` LIKE '%${search}%' `; //沒有處理SQL injection

    where += ` AND (\`name\` LIKE ${db.escape(`%${search}%`)} `; // 這個方法會自動標單引號
    /* const search_ = `%${search}%`;
    where+=` AND \`name\` LIKE ${db.escape(search_)} `; */

    where += ` OR \`mobile\` LIKE ${db.escape(`%${search}%`)}) `; // 同一input搜尋多欄
  }

  if (birth_start) {
    const m = moment(birth_start);
    if (m.isValid()) {
      where += ` AND birthday >= '${m.format(dateFormat)}' `;
    }
  }

  if (birth_end) {
    const m = moment(birth_end);
    if (m.isValid()) {
      where += ` AND birthday <= '${m.format(dateFormat)}' `;
    }
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM address_book ${where}`;
  const [[{ totalRows }]] = await db.query(t_sql);
  let totalPages = 0; // 總頁數, 預設值
  let rows = []; // 分頁資料
  if (totalRows) {
    totalPages = Math.ceil(totalRows / perPage);
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success, redirect }; // 跳轉頁面
    }
    // 取得分頁資料
    const sql = `SELECT * FROM \`address_book\` ${where} ORDER BY sid DESC LIMIT ${
      (page - 1) * perPage
    },${perPage}`;

    [rows] = await db.query(sql);
    rows.forEach((item) => {
      const m = moment(item.birthday);
      item.birthday = m.isValid() ? m.format(dateFormat) : "";
    });
  }

  // res.json({ success, perPage, page, totalRows, totalPages, rows });
  success = true;
  return {
    success,
    perPage,
    page,
    totalRows,
    totalPages,
    rows,
    qs: req.query,
  };
};

router.get("/api", async (req, res) => {
  const data = await getListData(req);
  res.json(data);
});

export default router;
