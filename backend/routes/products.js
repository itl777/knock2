import express from "express";
import moment from "moment-timezone";
import db from "./../utils/connect.js";
import upload from "../utils/upload-imgs.js";

const dateFormat = "YYYY-MM-DD HH:mm:ss";
const router = express.Router();

const getListDate = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 9; //每頁數量
  let page = parseInt(req.query.page) || 1;

  if (page < 1) {
    redirect = "?page=1";
    return { success, redirect };
  }
  // 處裡搜尋欄位
  let userSearch = req.query.userSearch || "";
  let idSearch = req.params.product_id || "";
  let category_id = req.query.category_id || "";
  let where = " WHERE 1 ";

  if (userSearch) {
    const userSearch_ = db.escape(`%${userSearch}%`);
    where += `AND ( \`product_name\` LIKE ${userSearch_} OR \`product_id\` LIKE ${userSearch_} `;
  }
  if (idSearch) {
    const idSearch_ = db.escape(`%${idSearch}%`);
    where += `AND ( \`product_id\` LIKE ${idSearch_} ) `;
    console.log("where:", where);
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
  let productImg = "";

  // 查詢的db有無回傳值
  if (totalRows) {
    // 有回傳，計算總頁數
    totalPages = Math.ceil(totalRows / perPage);
    // 判斷輸入的page是否大於總頁數
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success, redirect };
    }
    // 文字
    // const sql = `SELECT * FROM \`product_management\` ${where} ORDER BY product_id  DESC LIMIT ${
    //   (page - 1) * perPage
    // },${perPage}`;

    // 圖片
    const sql = `SELECT * FROM \`product_management\` JOIN \`product_img\`
    on \`product_id\` = \`img_product_id\` ${where} ORDER BY product_id  DESC LIMIT ${
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
      // qs: req.query,
    };
  } else {
    return { success, redirect };
  }
};

router.get("/", async (req, res) => {
  const data = await getListDate(req);
  if (data.redirect) {
    return res.json({
      redirect: data.redirect,
      message: "無法查詢到資料，查詢字串可能有誤",
    });
  }
  if (data.success) {
    const category_sql = "SELECT * FROM product_category";
    const [category_result] = await db.query(category_sql);
    data.category_result = category_result;

    return res.json({
      status: "success",
      data: data,
    });
  }
});

router.get("/details/:product_id", async (req, res) => {
  const data = await getListDate(req);
  res.json(data);
});

export default router;
