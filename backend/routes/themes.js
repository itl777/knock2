import express from "express";
import db from "./../utils/connect.js";

const router = express.Router();

const getThemesList = async (req) => {
  let success = false;

  let theme_id = req.query.category_id || "";
  let where = " WHERE 1 ";

  // 類別篩選
  // if (category_id) {
  //   const category_id_ = db.escape(`${category_id}`);
  //   where = ` JOIN \`product_category\` ON themes.category_id = product_category.category_id WHERE themes.category_id=${category_id_} `;
  // }

  const sql = `SELECT * FROM \`themes\` ${where} ORDER BY theme_id DESC`;

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

router.get("/", async (req, res) => {
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
