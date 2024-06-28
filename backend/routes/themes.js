import express from "express";
import db from "./../utils/connect.js";

const router = express.Router();

const getThemesList = async (req) => {
  let success = false;

  const sql = `
    SELECT 
      t.theme_id,
      t.theme_name,
      t.theme_img,
      t.difficulty,
      t.introduction,
      t.min_players,
      t.max_players,
      t.theme_time,
      b.branch_name
    FROM themes t
    LEFT JOIN branch_themes bt ON t.theme_id = bt.theme_id
    LEFT JOIN branches b ON bt.branch_id = b.branch_id
    ORDER BY t.theme_id DESC
  `;

  try {
    console.log("Executing SQL:", sql); // 添加日志查看执行的SQL查询
    const [rows] = await db.query(sql);
    console.log("SQL Result:", rows); // 添加日志查看SQL查询的结果
    success = true;
    return {
      success,
      themes: rows,
    };
  } catch (err) {
    console.error("Error fetching themes:", err);
    return { success };
  }
};

router.get("/", async (req, res) => {
  // 确保路径与前端请求一致
  const data = await getThemesList(req);
  if (!data.success) {
    return res.json({
      status: "error",
      message: "無法查詢到主題資料",
    });
  }

  return res.json({
    status: "success",
    themes: data.themes,
  });
});

export default router;
