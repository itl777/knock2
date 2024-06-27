import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import db from "./utils/connect.js";
import upload from "./utils/upload-imgs.js";
import bcrypt from "bcrypt";
// 路由模組
import themes from "./routes/themes.js";
import teams from "./routes/teams.js";
import products from "./routes/products.js";
import users from "./routes/users.js";
import orders from "./routes/orders.js";

// 掛載 express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true); // 全部origin都允許
  },
};
app.use(cors(corsOptions));

// 自訂頂層的 middleware
app.use((req, res, next) => {
  // 解析jwt
  const auth = req.get("Authorization");
  if (auth && auth.indexOf("Bearer ") === 0) {
    const token = auth.slice(7);
    try {
      req.my_jwt = jwt.verify(token, process.env.JWT_KEY);
    } catch (ex) {
      console.log(ex);
    }
  }
  next();
});

// 登入功能
app.post("/login-jwt", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    body: req.body,
    data: {
      id: 0,
      account: "",
      nickname: "",
      token: "",
    },
  };

  const sql = "SELECT * FROM members WHERE account=?";
  const [rows] = await db.query(sql, [req.body.account]);

  if (!rows.length) {
    // 帳號是錯的
    output.code = 400;
    return res.json(output);
  }

  const result = await bcrypt.compare(req.body.password, rows[0].password);
  if (!result) {
    // 密碼是錯的
    output.code = 420;
    return res, json(output);
  }

  output.success = true;

  // 沒有要紀錄session狀態，改jwt
  const payload = {
    id: rows[0].id,
    account: rows[0].account,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);

  output.data = {
    id: rows[0].id,
    account: rows[0].account,
    nickname: rows[0].nickname,
    avatar: rows[0].avatar,
    token,
  };

  res.json(output);
});

app.post("/verify-token", (req, res) => {
  const output = { success: true, payload: {} };
  try {
    output.payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  } catch (ex) {
    // 如果 token 是無效的
    output.payload = req.body.token;
    output.success = false;
  }

  res.json(output);
});

// *********設定靜態內容資料夾*********
app.use(express.static("public"));

// 路由模組
app.use("/themes", themes);
app.use("/teams", teams);
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

// 偵聽 port
app.listen(3001, function () {
  console.log("啟動 server 偵聽埠號 3001");
});
