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

//

const getOneData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 9;
  let page = +req.query.page || 1; // 從query string取得page的值
  // == let page = parseInt(req.query.page) || 1; // parseInt() = +

  if (page < 1) {
    output.redirect = "?page=1"; //跳轉頁面
    output.info = "page值不能小於1";
    return output;
  }

  let where = " WHERE 1 ";
  let rows = []; //分頁資料填入

  const sql = `SELECT * FROM \`teams\` 
  join \`users\` on leader_id = users.user_id
  join \`themes\` on \`tour\` = themes.theme_id
  left join \`teams_members\` on team_id = join_team_id
  ${where} ORDER BY team_id DESC LIMIT ${(page - 1) * perPage},${perPage}`;
  
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

router.get("/apiOne", async (req, res) => {
  const data = await getOneData(req);
  res.json(data);
});

//

const getAllData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 9;
  let page = +req.query.page || 1; // 從query string取得page的值
  // == let page = parseInt(req.query.page) || 1; // parseInt() = +

  if (page < 1) {
    output.redirect = "?page=1"; //跳轉頁面
    output.info = "page值不能小於1";
    return output;
  }

  let where = " WHERE 1 ";
  let rows = []; //分頁資料填入

  const sql = `SELECT reservation_id , team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time
FROM reservations r
join \`teams_list\` team  on team.tour = reservation_id
join \`themes\` on branch_themes_id = themes.theme_id
join \`users\` u on r.user_id = u.user_id
join \`sessions\` s on r.session_id = s.sessions_id
join \`branch_themes\` bt on r.branch_themes_id = bt.branch_themes_id
join \`branches\` b on bt.branch_id = b.branch_id`;

console.log(sql);


  [rows] = await db.query(sql);
  success = true;
  return {
    success,
    // perPage,
    // page,
    // totalRows,
    // totalPages,
    rows,
    qs: req.query,
  };
};
router.get("/apiAll", async (req, res) => {
  const data = await getAllData(req);
  res.json(data);
});

export default router;
