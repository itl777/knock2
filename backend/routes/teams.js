import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";
import { getIdParam } from "../utils/db-tool.js"

const router = express.Router();

// 有搜尋的所有團隊紀錄

const searchData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 6;
  let page = parseInt(req.query.page) || 1;

  if (page < 1) {
    redirect = "?page=1";
    return { success, redirect };
  }

  //搜尋排序
  let branch_id = req.query.branch_id || "";
  let team_status = req.query.team_status || "";
  let teamSearch = req.query.team_id || req.params.team_id || "";
  let userSearch = req.query.user_id || req.params.user_id || "";
  let start_date = req.query.startdate || "";
  let end_date = req.query.enddate || "";
  
  let sort = req.query.sort || "reservation_id";
  const order = req.query.order || "DESC";

  let where = " WHERE 1 ";
  let rows = [];

  if (userSearch) {
    const userSearch_esc = db.escape(`${userSearch}`);
    where += ` AND (u.user_id = ${userSearch_esc})`;
  }

  if (teamSearch) {
    const teamSearch_esc = db.escape(`${teamSearch}`);
    where += ` AND (team.team_id = ${teamSearch_esc})`;
  }

  if (branch_id && branch_id.trim() !== "") {
    const branch_id_esc = db.escape(`${branch_id}`);
    where += ` AND (b.branch_id = ${branch_id_esc})`;
  }

  if (team_status && team_status.trim() !== "") {
    const team_status_esc = db.escape(`${team_status}`);
    where += ` AND (team.team_states = ${team_status_esc})`;
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM reservations r
  LEFT JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` t ON branch_themes_id = t.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  ${where}`;
  // ORDER BY ${sort} ${order}
  console.log(t_sql);
  const [[{ totalRows }]] = await db.query(t_sql);

  
  let totalPages = 0;

  if (totalRows) {
    totalPages = Math.ceil(totalRows / perPage);
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success, redirect };
    }


  const sql = `SELECT reservation_id, team_id, team_title, theme_name, b.branch_id, difficulty, u.user_id, nick_name, branch_name, reservation_date, s.start_time , theme_img, s.theme_Time, team_status
  FROM reservations r
  JOIN \`teams_list\` team ON team.r_id = reservation_id
  JOIN \`themes\` t ON branch_themes_id = t.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  ${where} 
  ORDER BY ${sort} ${order}
  LIMIT ${(page - 1) * perPage},${perPage}`;

  [rows] = await db.query(sql);
  success = true;

}
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

router.get("/apiSearch/", async (req, res) => {
  const data = await searchData(req);
  res.json(data);
});

router.get("/apiSearch/user/:user_id", async (req, res) => {
  const data = await searchData(req);
  res.json(data);
});

router.get("/api/:team_id", async (req, res) => {
  const team_id = +req.params.team_id || 0;
  if (!team_id) {
    return res.json({ success: false, error: "沒有編號" });
  }});

// router.get("/apiSearch/team/:team_id", async (req, res) => {
//   const data = await searchData(req);
//   res.json(data);
// });

// 取得還沒開團的資料

const noTeamData = async (req) => {
  let success = false;

  let user_id = req.params.user_id || "";
  let where = "";
  let rows = [];

  if (user_id && user_id.trim() !== "") {
    const user_id_esc = db.escape(`${user_id}`);
    where += ` AND (u.user_id = ${user_id})`;
  }

  const sql =`SELECT reservation_id, team_id, team_title, theme_name, b.branch_id, difficulty, u.user_id, nick_name, branch_name, reservation_date, s.start_time , theme_img, s.theme_Time, team_status
  FROM reservations r
  LEFT JOIN \`teams_list\` team ON r_id = reservation_id
  JOIN \`themes\` t ON branch_themes_id = t.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
  WHERE team_id IS NULL ${where}`;

// const [rows] = await db.query(sql);
  [rows] = await db.query(sql);

  if (rows.length > 0) {
    success = true;
  } else {
    // 如果沒有資料，返回一個特定訊息
    rows = [{ message: 'No data found' }];
  }

return {
  success,
  rows,
  qs: req.query,
}
}

router.get("/api/no_team/:user_id", async (req, res) => {
  const data = await noTeamData(req)
  res.json(data);

  })

//--分隔線

// 取得單項資料的 API
router.get("/api/team/:team_id", async (req, res) => {
  const team_id = +req.params.team_id || 0;
  if (!team_id) {
    return res.json({ success: false, error: "沒有編號" });
  }

  // reservation_id, team_id, u.user_id, team_note, team_title, theme_name, difficulty, nick_name,
  // branch_name, reservation_date, s.start_time, theme_img, s.theme_Time, avatar
  const sql = `SELECT reservation_id, team_id, u.user_id, team_note, team_title, theme_name, difficulty, nick_name,
              branch_name, reservation_date, s.start_time, theme_img, s.theme_Time, avatar
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

// 新增留言的API
router.post("/api/chat/add", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };

  let body = { ...req.body };
  body.create_at = new Date();

  const { chat_at, chat_by, chat_text } = body;
  try {
  const sql = "INSERT INTO `teams_chats` (`chat_at`, `chat_by`, `chat_text`, `create_at`) VALUES (?, ?, ?, ?)";
  const [result] = await db.query(sql, [chat_at, chat_by, chat_text, body.create_at]);

  }catch (ex) {
    output.error = ex.message;
  }

  res.json(output);
});

// 新增揪團的API
router.post("/api/teams/add", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };

  let body = { ...req.body };
  body.create_at = new Date();

  const { chat_at, chat_by, chat_text } = body;
  try {
  const sql = "INSERT INTO `teams_chats` (`chat_at`, `chat_by`, `chat_text`, `create_at`) VALUES (?, ?, ?, ?)";
  const [result] = await db.query(sql, [chat_at, chat_by, chat_text, body.create_at]);

  }catch (ex) {
    output.error = ex.message;
  }

  res.json(output);
});

export default router;

