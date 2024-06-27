import express from "express";
import db from "./../utils/connect.js";
import moment from "moment-timezone";
import upload from "../utils/upload-imgs.js";

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

// // 模擬網路延遲的狀況 middleware
// router.use((req, res, next) => {
//   const ms = 100 + Math.floor(Math.random() * 2000);
//   setTimeout(() => {
//     next();
//   }, ms);
// });

// 讀取資料的api
router.post("/api", async (req, res) => {
  const output = {
    success: false,
    error: 0,
    users: {},
    address: {},
  };

  if (!req.my_jwt?.id) {
    output.error = "沒登入";
    return res.json(output);
  }

  const id = +req.my_jwt?.id || 0;
  if (!id) {
    output.error = "找不到這筆資料";
    return res.json(output);
  }

  const sql1 = `SELECT account,name,nick_name,gender,birthday,users.mobile_phone,invoice_carrier_id,tax_id,avatar 
  FROM users WHERE users.user_id = ${id}`;
  const [users] = await db.query(sql1);

  if (!users.length) {
    //沒有該筆資料
    output.error = "資料庫沒有該筆資料";
    return res.json(output);
  }

  const m = moment(users[0].birthday);
  users[0].birthday = m.isValid() ? m.format(dateFormat) : "";

  const sql2 = `SELECT address.id,district_id,address,recipient_name,address.mobile_phone as recipient_phone,type,district_name,city_name 
  FROM address 
  LEFT JOIN district
  ON district_id = district.id 
  LEFT JOIN city
  ON city_id = city.id 
  WHERE user_id = ${id}`;
  const [address] = await db.query(sql2);

  output.success = true;
  output.users = users[0];
  output.address = address;
  res.json(output);
});

// 處理編輯的api
router.put("/api/:sid", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };

  const sid = +req.params.sid || 0;
  if (!sid) {
    return res.json(output);
  }

  let body = { ...req.body };
  body.created_at = new Date();

  const m = moment(body.birthday); //用moment去驗證是否為空字串
  body.birthday = m.isValid() ? m.format(dateFormat) : null;

  try {
    const sql = "UPDATE `address_book` SET ? WHERE sid=? ";
    const [result] = await db.query(sql, [body, sid]);
    output.result = result;
    output.success = !!(result.affectedRows && result.changedRows);
  } catch (ex) {
    output.error = ex;
  }

  res.json(output);
});

// 處理新增的api
router.post("/add", upload.none(), async (req, res) => {
  // TODO 欄位資料的檢查

  /*
  const sql = "INSERT INTO address_book (`name`,`email`,`mobile`,`birthday`,`address`,`created_at`) VALUES ( ?, ?, ?, ?, ?, NOW())";
  const [ result ] = await db.query(sql,[
    req.body.name,
    req.body.email,
    req.body.mobile,
    req.body.birthday,
    req.body.address,
  ])
  */

  let body = { ...req.body };
  body.created_at = new Date();

  const m = moment(body.birthday); //用moment去驗證是否為空字串
  body.birthday = m.isValid() ? m.format(dateFormat) : null;

  const sql = "INSERT INTO address_book SET ?";
  const [result] = await db.query(sql, [body]);

  res.json({
    result,
    success: !!result.affectedRows,
  });
});

// 處理刪除的api
router.delete("/api/:sid", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };

  if (!req.my_jwt?.id) {
    output.code = 470;
    return res.json(output);
  }

  const sid = +req.params.sid || 0;
  if (!sid) {
    output.code = 480;
    return res.json(output);
  }

  const sql = `DELETE FROM address_book WHERE sid=${sid}`;
  const [result] = await db.query(sql);
  output.result = result;
  output.success = !!result.affectedRows;

  res.json(output);
});

// 上傳的api
router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.json({
    body: req.body,
    file: req.file,
  });
});

export default router;
