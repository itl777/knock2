import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import db from "./utils/connect-mysql.js"

// 路由模組
import themes from "./routes/themes.js";
import teams from "./routes/teams.js";
import products from "./routes/products.js";
import users from "./routes/users/index.js";
import orders from "./routes/orders.js";
import checkout from "./routes/checkout.js";
import payments from "./routes/payments.js";
import coupons from "./routes/coupons.js";
import reservations from "./routes/reservations.js";
import notifications from "./routes/notifications.js";
import pdRouter from "./routes/productCMS.js"
import whRouter from "./routes/warehousing.js"

// Socket.io
import './msg-socket.js'

// 掛載 express
const app = express();

app.set("view engine", "ejs")

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

// 使用套件紀錄 http 請求 **** added by iris
app.use(morgan("dev"));

// title
app.use((req, res, next) => {
  res.locals.title = "密室逃脫";
  next();
})


// 自訂頂層的 middleware
app.use((req, res, next) => {
  // 解析jwt
  const auth = req.get("Authorization");
  if (auth && auth.indexOf("Bearer ") === 0) {
    const token = auth.slice(7);
    try {
      req.my_jwt = jwt.verify(token, process.env.JWT_KEY);
    } catch (ex) {
      console.error(ex);
    }
  }
  next();
});

// *********設定靜態內容資料夾*********
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));


// 路由模組
app.use("/themes", themes);
app.use("/teams", teams);
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);
app.use("/checkout", checkout);
app.use("/payments", payments);
app.use("/coupons", coupons);
app.use("/reservations", reservations);
app.use("/notifications", notifications);
app.use("/productCMS", pdRouter);
app.use("/warehousing", whRouter);


// CMS登入頁面
app.get("/login",async (req,res)=>{
  res.locals.title ="登入 | " + res.locals.title;
  res.locals.pageName ="pd_login";
  res.render("login")
})


// 偵聽 port
app.listen(3001, function () {
  console.log("啟動 server 偵聽埠號 3001");
});
