import express from "express";
import db from "./../utils/connect.js";

const router = express.Router();

// 獲取主题列表的函數
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

// 獲取分店列表的函數
const getBranchesList = async () => {
  let success = false;

  const sql = `
    SELECT *
    FROM branches
    ORDER BY branch_id DESC
  `;

  try {
    console.log("Executing SQL:", sql);
    const [rows] = await db.query(sql);
    console.log("SQL Result:", rows);
    success = true;
    return {
      success,
      branches: rows,
    };
  } catch (err) {
    console.error("Error fetching branches:", err);
    return { success };
  }
};

// 主题列表的路由
router.get("/", async (req, res) => {
  const branchId = req.query.branch_id; // 從查詢參數中獲取分店ID
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

// 分店列表的路由
router.get("/branches", async (req, res) => {
  const data = await getBranchesList();
  if (!data.success) {
    return res.status(500).json({
      status: "error",
      message: "無法查詢到分店資料",
    });
  }

  return res.json({
    status: "success",
    branches: data.branches,
  });
});

export default router;
