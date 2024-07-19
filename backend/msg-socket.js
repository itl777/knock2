import express from "express";
import db from "./utils/connect-mysql.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
// 註冊樣板引擎
app.set("view engine", "ejs");
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});


io.on("connection", (socket) => {
  console.log("有人連上了");

  // 監聽加入房間
  socket.on("joinRoom",async ({ room, username }) => {
    try {
      const [results] = await db.query('SELECT * FROM messages WHERE room = ?', [room]);
      socket.emit('history', results);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('error', { message: 'Failed to fetch chat history' });
    }

    socket.join(room); // 將 socket 加入指定的房間
    console.log(`${username} joined room: ${room}`);
    console.log(`-------joined room--------`);
  });

  socket.on("chat message", async (data) => {
    const { room, username, message } = data;
    console.log(`${username} : ${message}`);

    // 存入資料庫
    try {
      const [results] = await db.query('INSERT INTO messages (room, username, message) VALUES (?, ?, ?)', [room, username, message]);
      io.to(room).emit("chat message", { username, message }); // 发送消息给指定房间的所有客户端
        console.log("INSERT INTO OK");
        // INSERT INTO OK ResultSetHeader {
        //   fieldCount: 0,
        //   affectedRows: 1,
        //   insertId: 33,
        //   info: '',
        //   serverStatus: 2,
        //   warningStatus: 0,
        //   changedRows: 0
        // }
        
    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('error', { message: 'Failed to fetch chat history' });
    }

    // 單人房
    // io.to(room).emit("chat message", { username, message }); // 將訊息發送到指定的房間
    // 多人不分房
    // io.emit("chat message", {username,message});
  });
  // 當發生離線事件
  socket.on("disconnect", () => {
    io.emit("chat message", { username: "廣播訊息", message: "Bye~~~~" });
  });
});

server.listen(4040, () => {
  console.log("server running at http://localhost:4040");
});

// ************
// 設定靜態內容資料夾
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// ************ 404 要放在所有的路由設定之後
app.use((req, res) => {
  res.status(404).send(`<h1>找不到頁面</h1>`);
});