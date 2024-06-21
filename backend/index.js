import express from "express";
import multer from "multer";
import db from "./utils/connect-mysql.js";
import teamsRouter from "./routes/teams.js";
// import mysql_session from "express-mysql-session";

const web_port = 3001;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));

app.use(express.json());


app.use("/teams",teamsRouter);

app.use((req,res)=>{
    res.type("text/plain");
    res.status(404);
    res.send("404-找不到網頁");
});


app.listen(web_port, () => {
  console.log(`伺服器啟動於通訊埠：${web_port}`);
});