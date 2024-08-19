import express from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js";
import upload from "../utils/upload-imgs.js";

const dateFormat = "YYYY-MM-DD HH:mm:ss";
const router = express.Router();

const getListDate = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 25;
  let page = parseInt(req.query.page) || 1;

  if (page < 1) {
    redirect = "?page=1";
    return { success, redirect };
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM product_warehousing`;

  const [[{ totalRows }]] = await db.query(t_sql);
  let totalPages = 0;
  let rows = [];

  // 查詢的db有無回傳值
  if (totalRows) {
    // 有回傳，計算總頁數
    totalPages = Math.ceil(totalRows / perPage);
    // 判斷輸入的page是否大於總頁數
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success, redirect };
    }

    const sql = `SELECT * FROM \`product_warehousing\` ORDER BY warehousing_id  DESC LIMIT ${
      (page - 1) * perPage
    },${perPage}`;

    [rows] = await db.query(sql);

    rows.forEach((el) => {
      const m = moment(el.warehousing_date);
      // isValid() 檢查日期格式是否無效
      el.warehousing_date = m.isValid() ? m.format(dateFormat) : "";
    });

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
  } else {
    redirect = "/warehousing";
    return { success, redirect };
  }
};

router.get("/", async (req, res) => {
  res.locals.title = "庫存列表 | " + res.locals.title;
  res.locals.pageName = "wh_list";
  const data = await getListDate(req);
  if (data.redirect) {
    return res.redirect(data.redirect);
  }
  if (data.success) {
    res.render("warehousing/list", data);
  }
});

router.get("/api", async (req, res) => {
  const data = await getListDate(req);
  res.json(data);
});

// 新增資料
router.get("/add", async (req, res) => {
  res.locals.title = "新增庫存 | " + res.locals.title;
  res.locals.pageName = "wh_add";

  res.render("warehousing/add");
});

router.post("/add", async (req, res) => {
  let body = { ...req.body };
  body.created_at = new Date();

  const sql = "INSERT INTO product_warehousing SET ?";
  const [result] = await db.query(sql, [body]);
  res.json({
    result,
    success: !!result.affectedRows,
  });
});
// 刪除
router.delete("/api/:warehousing_id", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };
  const warehousing_id = +req.params.warehousing_id || 0;
  if (!warehousing_id) {
    return res.json(output);
  }
  const sql = `DELETE FROM product_warehousing WHERE warehousing_id =?`;
  const [result] = await db.query(sql, warehousing_id);
  output.result = result;
  output.success = !!result.affectedRows;

  res.json(output);
});

// 編輯表單頁
router.get("/edit/:warehousing_id", async (req, res) => {
  res.locals.title = "編輯庫存 | " + res.locals.title;
  res.locals.pageName = "wh_edit";

  const warehousing_id = +req.params.warehousing_id || 0;
  console.log("warehousing_id", warehousing_id);
  if (!warehousing_id) {
    return res.redirect("/warehousing");
  }

  const sql = `SELECT * FROM product_warehousing WHERE warehousing_id =?`;
  const pdSql = `SELECT product_id,product_name FROM product_management WHERE 1`;

  const [rows] = await db.query(sql, warehousing_id);
  const [pdRows] = await db.query(pdSql);
  if (!rows.length) {
    return res.redirect("/warehousing");
  }
  rows[0].last_modified_at = moment().format(dateFormat);
  rows[0].created_at = moment().format(dateFormat);

  const whRows = rows[0];
  console.log("whRows:", whRows); //obj
  console.log("pdRows:", pdRows); //array

  res.render("warehousing/edit", { whRows, pdRows });
});

// 處裡編輯表單
router.put("/api/:warehousing_id", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };
  const warehousing_id = +req.params.warehousing_id || 0;
  if (!warehousing_id) {
    return res.json(output);
  }

  try {
    const sql = "UPDATE `product_warehousing` SET ? WHERE warehousing_id =? ";
    req.body.last_modified_at = moment().format(dateFormat);
    const [result] = await db.query(sql, [req.body, warehousing_id]);
    output.result = result;
    output.success = !!(result.affectedRows && result.changedRows);
    console.log(output.success);
  } catch (ex) {
    output.error = ex;
  }

  res.json(output);
});

export default router;
