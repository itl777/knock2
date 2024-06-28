import express from "express";
import db from "./../utils/connect.js";

const router = express.Router();

const getThemesList = async (branchId) => {
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
    WHERE b.branch_id = ?
    ORDER BY t.theme_id DESC
  `;

  try {
    console.log("Executing SQL:", sql);
    const [rows] = await db.query(sql, [branchId]);
    console.log("SQL Result:", rows);
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
  const branchId = req.query.branch_id; // 从查询参数中获取分店ID
  const data = await getThemesList(branchId);
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
