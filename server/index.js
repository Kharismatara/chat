const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("Received message:", msg);
    socket.broadcast.emit("chat message", msg); // Mengirim pesan ke semua klien terhubung kecuali pengirim
  });
});

http.listen(3001, () => {
  console.log("Server started on port 3001");
});
