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
    b.branch_name,
    bt.branch_themes_id  
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
  const sql = `
    SELECT 
      bt.branch_themes_id,
      t.theme_id,
      t.theme_name,
      t.theme_img,
      t.theme_banner,
      t.min_players,
      t.max_players,
      t.theme_time,
      t.difficulty,
      t.price,
      t.deposit,
      t.theme_desc,
      b.branch_name,
      f.storyline,
      f.puzzle_design,
      f.atmosphere,
      c.coupon_name,
      c.discount_percentage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'sessions_id', s.sessions_id,
          'start_time', DATE_FORMAT(s.start_time, '%H:%i'),
          'end_time', DATE_FORMAT(s.end_time, '%H:%i'),
          'theme_time', s.theme_time,
          'intervals', s.intervals
        )
      ) AS sessions
    FROM themes t
    LEFT JOIN branch_themes bt ON t.theme_id = bt.theme_id
    LEFT JOIN branches b ON bt.branch_id = b.branch_id
    LEFT JOIN feedback f ON bt.feedback_id = f.feedback_id
    LEFT JOIN sessions s ON t.theme_id = s.theme_id
    LEFT JOIN coupons c ON bt.id = c.id
    WHERE bt.branch_themes_id = ?
  `;

  try {
    const [rows] = await db.query(sql, [branch_themes_id]);

    if (rows.length > 0) {
      return {
        success: true,
        theme: rows[0],
      };
    } else {
      return {
        success: false,
        theme: null,
        message: "No theme found for the given branch_themes_id",
      };
    }
  } catch (err) {
    console.error("Error fetching theme details:", err.message);
    console.error("SQL Query:", sql);
    return {
      success: false,
      theme: null,
      message: "Error fetching theme details",
    };
  }
};

const getImg = async (req) => {
  let success = false;
  let rows = [];
  const theme_id = +req.params.theme_id || 0;

  try {
    const sql = `
      SELECT t.theme_img, t.theme_banner 
      FROM themes t 
      LEFT JOIN branch_themes bt ON t.theme_id = bt.theme_id 
      WHERE t.theme_id = ${theme_id}
    `;
    [rows] = await db.query(sql);

    success = true;
  } catch (error) {
    console.error("Error fetching image:", error);
  }

  return {
    success,
    rows,
  };
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
  const { branch_themes_id } = req.params;
  const data = await getThemesDetails(branch_themes_id);
  res.json(data);
});

// 圖片
router.get("/img/:theme_id", async (req, res) => {
  try {
    const data = await getImg(req);
    console.log(req.params.theme_id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "/img/:theme_id出錯了" });
  }
});

export default router;
