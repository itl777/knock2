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
    const [rows] = await db.query(sql, [branchId]);
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

// 獲取第二個分店主題列表的函數
const getSecondThemesList = async () => {
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
    const [rows] = await db.query(sql);
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

// 獲取主題的詳情
const getThemesDetails = async (branch_themes_id) => {
  let success = false;

  const sql = `
  SELECT 
    branch_themes_id,
    t.theme_id,
    t.theme_name,
    t.theme_img,
    t.theme_banner,
    t.difficulty,
    t.price,
    t.deposit,
    t.theme_desc,
    t.theme_time,
    b.branch_name
  FROM themes t
  LEFT JOIN branch_themes bt ON t.theme_id = bt.theme_id
  LEFT JOIN branches b ON bt.branch_id = b.branch_id
  WHERE bt.branch_themes_id = ?
  `;

  try {
    const [rows] = await db.query(sql, [branch_themes_id]);
    if (rows.length > 0) {
      success = true;
    }
    return {
      success,
      theme: rows[0], // 只返回單個主題詳情
    };
  } catch (err) {
    console.error("Error fetching theme details:", err);
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
    const [rows] = await db.query(sql);
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

// 第二個主題列表的路由
router.get("/second", async (req, res) => {
  const data = await getSecondThemesList();
  if (!data.success) {
    return res.json({
      status: "error",
      message: "無法查詢到第二個分店主題資料",
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

// 分店主題列表的路由
router.get("/branch-themes", async (req, res) => {
  const data = await getBranchThemesList();
  if (!data.success) {
    return res.status(500).json({
      status: "error",
      message: "無法查詢到分店主題資料",
    });
  }

  return res.json({
    status: "success",
    branch_themes: data.branch_themes,
  });
});

router.get("/details/:branch_themes_id", async (req, res) => {
  const { branch_themes_id } = req.params; // 從 URL 中獲取 branch_themes_id
  const data = await getThemesDetails(branch_themes_id);

  if (!data.success) {
    return res.status(500).json({
      status: "error",
      message: "無法查詢到主題詳情",
    });
  }

  return res.json({
    status: "success",
    theme: data.theme,
  });
});

export default router;
