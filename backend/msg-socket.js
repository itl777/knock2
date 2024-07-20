import express from "express";
import db from "./utils/connect-mysql.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
var socket_list = []
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
  socket_list.push(socket)
  console.log("有人連上了", socket_list.length);

  // 監聽加入房間j
  socket.on("joinRoom",async ({ room, username }) => {
    try {
      const [results] = await db.query('SELECT * FROM messages WHERE room = ?', [room]);
      io.emit('joinRoom', { room, username });
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

    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('error', { message: 'Failed to fetch chat history' });
    }

    // 單人房
    // io.to(room).emit("chat message", { username, message }); // 將訊息發送到指定的房間
    // 多人不分房
    // io.emit("chat message", {username,message});
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