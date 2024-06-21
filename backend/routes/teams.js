import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";

const router = express.Router();

const getListData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 10;
  let page = +req.query.page || 1; // 從query string取得page的值
  // == let page = parseInt(req.query.page) || 1; // parseInt() = +

  if (page < 1) {
    output.redirect = "?page=1"; //跳轉頁面
    output.info = "page值不能小於1";
    return output;
  }

  let where = " WHERE 1 ";
  let rows = []; //分頁資料填入

  const sql = `SELECT * FROM \`teams\` ${where} ORDER BY team_id DESC LIMIT ${(page - 1) * perPage},${perPage}`;
  console.log(sql);

  [rows] = await db.query(sql);
  success = true;
  return {
    success,
    perPage,
    page,
    // totalRows,
    // totalPages,
    rows,
    qs: req.query,
  };
};

router.get("/api", async (req, res) => {
    const data = await getListData(req);
    res.json(data);
  });
  export default router;
  