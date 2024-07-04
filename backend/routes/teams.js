import express from "express";
import moment from "moment-timezone";
import db from "../utils/connect-mysql.js";
import { getIdParam } from "../utils/db-tool.js"

const router = express.Router();


router.get('/teams', async function (req, res){
  const conditions = []

    // 觀察where
    console.log(where)

    // 排序
    const sort = req.query.sort || 'id'
    const order = req.query.order || 'asc'
    const orderby = `ORDER BY ${sort} ${order}`

    // 分頁用
    const page = Number(req.query.page) || 1
    const perpage = Number(req.query.perpage) || 10 // 預設每頁10筆資料
    const offset = (page - 1) * perpage
    const limit = perpage

    const [rows] = await db.query(
      `SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time
  FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` ON branch_themes_id = themes.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id
      ${where} ${orderby} LIMIT ${limit} OFFSET ${offset}`
    )
    const teams = rows
    
  // 計算目前的where過濾條件下的總資料筆數
  const [rows2] = await db.query(
    `SELECT COUNT(*) AS count FROM my_product ${where}`
  )
  const { count } = rows2[0]

  // 計算目前總共幾頁
  const pageCount = Math.ceil(count / perpage)

  // 處理如果沒找到資料

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: {
      total: count, // 代表目前查詢得到的所有筆數
      pageCount, // 代表目前的總共多少頁
      page, // 目前第幾頁
      perpage, // 目前每頁幾筆資料
      products, // 目前這頁的資料陣列
    },
  })
})



//
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
    //perPage,
    //page,
    //totalRows,
    //totalPages,
    rows,
    qs: req.query,
  };
};

router.get("/apiAll", async (req, res) => {
  const data = await getAllData(req);
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

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:team_id', async function (req, res) {
  // 轉為數字(最好都使用一致的命名，從資料庫的主鍵到傳入的動態參數pid，這裡的作法比較不好容易搞混)
  const team_id = getIdParam(req)

  // const product = await My_Product.findByPk(id, {
  //   raw: true, // 只需要資料表中資料
  // })

  const [rows] = await db.query(`SELECT reservation_id, team_id ,team_title, theme_name, difficulty, nick_name, branch_name, reservation_date, s.start_time, s.end_time FROM reservations r
  JOIN \`teams_list\` team ON team.tour = reservation_id
  JOIN \`themes\` ON branch_themes_id = themes.theme_id
  JOIN \`users\` u ON r.user_id = u.user_id
  JOIN \`sessions\` s ON r.session_id = s.sessions_id
  JOIN \`branch_themes\` bt ON r.branch_themes_id = bt.branch_themes_id
  JOIN \`branches\` b ON bt.branch_id = b.branch_id

  WHERE team_id = ?`, [team_id])

  const team = rows[0]

  return res.json({ status: 'success', data: { team } })
})



export default router;

