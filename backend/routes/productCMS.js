import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";
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
  // 處裡搜尋欄位
  let userSearch = req.query.userSearch || "";
  let category_id = req.query.category_id || "";
  let where = " WHERE 1 ";

  if (userSearch) {
    console.log("userSearch:", userSearch);
    const userSearch_ = db.escape(`%${userSearch}%`);
    where += `AND ( \`product_name\` LIKE ${userSearch_} OR \`product_id\` LIKE ${userSearch_} ) `;
  }

  // 類別篩選
  if (category_id) {
    const category_id_ = db.escape(`${category_id}`);
    where = `JOIN \`product_category\` ON product_management.category_id = product_category.category_id where product_management.category_id=${category_id_} `;
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM product_management ${where}`;

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

    const sql = `SELECT * FROM \`product_management\` ${where} ORDER BY product_id  DESC LIMIT ${
      (page - 1) * perPage
    },${perPage}`;

    [rows] = await db.query(sql);

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
    redirect = "/productCMS";
    return { success, redirect };
  }
};

router.get("/", async (req, res) => {
  res.locals.title = "產品列表 | " + res.locals.title;
  res.locals.pageName = "pd_list";
  const data = await getListDate(req);
  if (data.redirect) {
    return res.redirect(data.redirect);
  }
  if (data.success) {
    const category_sql = "SELECT * FROM product_category";
    const [category_result] = await db.query(category_sql);
    data.category_result = category_result;

    res.render("product/list", data);
  }
});

router.get("/api", async (req, res) => {
  const data = await getListDate(req);
  res.json(data);
});

// 新增資料
router.get("/add", async (req, res) => {
  res.locals.title = "新增商品 | " + res.locals.title;
  res.locals.pageName = "pd_add";

  // 分類與狀態db
  const status_sql = "SELECT * FROM status";
  const [status_result] = await db.query(status_sql);
  const category_sql = "SELECT * FROM product_category";
  const [category_result] = await db.query(category_sql);

  res.render("product/add", { status_result, category_result });
});

router.post("/add", async (req, res) => {
  let body = { ...req.body };
  body.created_at = new Date();
//   連結會員名
  // body.last_modified_by=req.session.admin.nickname;
  const sql = "INSERT INTO product_management SET ?";
  const [result] = await db.query(sql, [body]);
  res.json({
    result,
    success: !!result.affectedRows,
  });
});

// 刪除多筆
router.delete("/api/delete", async (req, res) => {
  const output = {
    success: false,
    code: 500,
    result: {},
  };
  let body = req.body.delArr.map(Number);
  if (!body) {
      output.code = 400;
      return res.json(output);
  }

  const sql = `DELETE FROM product_management WHERE product_id IN (?)`;
  const [result] = await db.query(sql, [body]);
  output.result = result;
  output.success = !!result.affectedRows;

  res.json(output);
});

// 刪除
router.delete("/api/:product_id", async (req, res) => {
  const output = {
    success: false,
    code: 501,
    result: {},
  };
  const product_id = +req.params.product_id || 0;
  if (!product_id) {
    return res.json(output);
  }
  const sql = `DELETE FROM product_management WHERE product_id =?`;
  const [result] = await db.query(sql,product_id);
  output.result = result;
  output.success = !!result.affectedRows;

  res.json(output);
});


// 編輯表單頁
router.get("/edit/:product_id", async (req, res) => {
  res.locals.title = "編輯商品 | " + res.locals.title;
  res.locals.pageName = "pd_edit";

  const product_id = +req.params.product_id || 0;
  if (!product_id) {
    return res.redirect("/productCMS");
  }

  // 分類與狀態db
  const status_sql = "SELECT * FROM status";
  // const pd_status_sql = `SELECT * FROM product_management JOIN status ON product_management.status = status_id WHERE product_id=${product_id}`;
  const [status_result] = await db.query(status_sql);
  const category_sql = "SELECT * FROM product_category";
  const [category_result] = await db.query(category_sql);

  const sql = `SELECT * FROM product_management WHERE product_id =?`;

  const [rows] = await db.query(sql,product_id);
  if (!rows.length) {
    return res.redirect("/productCMS");
  }

  const allRow = rows[0];

  res.render("product/edit", { allRow, status_result, category_result });
});

// 處裡編輯表單
router.put("/api/:product_id", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };
  const product_id = +req.params.product_id || 0;
  if (!product_id) {
    return res.json(output);
  }

  //   連結會員名
  // req.body.last_modified_by=req.session.admin.nickname;

  try {
    const sql = "UPDATE `product_management` SET ? WHERE product_id =? ";
    req.body.last_modified_at = moment().format(dateFormat);
    const [result] = await db.query(sql, [req.body, product_id]);
    output.result = result;
    output.success = !!(result.affectedRows && result.changedRows);
  } catch (ex) {
    output.error = ex;
  }

  res.json(output);
});

export default router;
