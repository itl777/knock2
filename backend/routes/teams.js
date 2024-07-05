import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";
import { getIdParam } from "../utils/db-tool.js"

const router = express.Router();


// 取得所有團隊紀錄

const getAllData = async (req) => {
  let success = false;
  let redirect = "";

  const perPage = 9;
  let page = +req.query.page || 1;

  if (page < 1) {
    output.redirect = "?page=1"; //跳轉頁面
    output.info = "page值不能小於1";
    return output;
  }

  let where = " WHERE 1 ";
  let rows = [];

  const sql = `SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time
  FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` ON branch_themes_id = themes.theme_id
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

  // rows = [
  //   {
  //     reservation_id: "1",
  //     team_title: "範例團-1",
  //     theme_name: "主題-1",
  //     difficulty: "難度-1",
  //     nick_name: "示例團長1",
  //     branch_name: "館別-1",
  //     reservation_date: "2024-09-30",
  //     start_time: "09:00",
  //     end_time: "11:00",
  //   },
  //   {
  //     reservation_id: "2",
  //     team_title: "範例團-2",
  //     theme_name: "主題-2",
  //     difficulty: "難度-2",
  //     nick_name: "示例團長2",
  //     branch_name: "館別-2",
  //     reservation_date: "2024-09-29",
  //     start_time: "09:00",
  //     end_time: "11:00",
  //   },
  // ];

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

  const sql = `SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time FROM reservations r
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

export default router;

