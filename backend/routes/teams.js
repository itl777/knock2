import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";
import { getIdParam } from "../utils/db-tool.js"

const router = express.Router();


// 取得所有團隊紀錄

const getAllData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 50;
  let page = +req.query.page || 1;

  if (page < 1) {
    output.redirect = "?page=1"; //跳轉頁面
    output.info = "page值不能小於1";
    return output;
  }

  let where = " WHERE 1 ";
  let rows = [];

  const sql = `SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time, theme_img, s.theme_Time
  FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` t ON branch_themes_id = t.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  ${where} ORDER BY reservation_id DESC LIMIT ${(page - 1) * perPage},${perPage}`;

console.log(sql);

// try {
  [rows] = await db.query(sql);
  success = true;
// } catch (error) {
//   console.error("SQL query error:", error);

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

router.get("/apiAll", async (req, res) => {
  const data = await getAllData(req);
  res.json(data);
});

//--分隔線

// 取得單項資料的 API
router.get("/api/:team_id", async (req, res) => {
  const team_id = +req.params.team_id || 0;
  if (!team_id) {
    return res.json({ success: false, error: "沒有編號" });
  }

  const sql = `SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, theme_img, s.theme_Time
  FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` ON branch_themes_id = themes.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  WHERE team_id=${team_id}`;

  const [rows] = await db.query(sql);

  if (!rows.length) {
    // 沒有該筆資料
    return res.json({ success: false, error: "沒有該筆資料" });
  }

  res.json({ success: true, data: rows[0] });
});

//--分隔線

// 取得指定id揪團的 API
router.get("/api/user/:user_id", async (req, res) => {
  const user_id = +req.params.user_id || 0;
  if (!user_id) {
    return res.json({ success: false, error: "沒有編號" });
  }

  const sql =`SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, theme_img, s.theme_Time
  FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` ON branch_themes_id = themes.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  WHERE u.user_id = ${user_id};`

  const [rows] = await db.query(sql);

  if (!rows.length) {
    // 沒有該筆資料
    return res.json({ success: false, error: "沒有該筆資料" });
  }

  res.json({ success: true, data: rows });
});


//--分隔線

// 取得留言資料的 API
router.get("/api/chat/:team_id", async (req, res) => {
  const team_id = +req.params.team_id || 0;
  if (!team_id) {
    return res.json({ success: false, error: "沒有編號" });
  }

  const sql =`SELECT chat_id, nick_name, avatar, chat_text, create_at 
FROM \`teams_chats\` 
JOIN \`users\` ON chat_by = user_id
WHERE chat_at = ${team_id} AND chat_display = 1`;

//  `SELECT nick_name, chat_text, chat_display, create_at, avatar
//   FROM teams_chats
//   JOIN \`users\` ON chat_by = user_id
//   WHERE chat_at=${team_id}`;

  const [rows] = await db.query(sql);

  if (!rows.length) {
    // 沒有該筆資料
    return res.json({ success: false, error: "沒有該筆資料" });
  }

  res.json({ success: true, data: rows });
});


export default router;

