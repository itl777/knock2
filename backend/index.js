import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
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
  res.locals.session = req.session; 
  next();
});



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
