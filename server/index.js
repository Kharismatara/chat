const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Menyajikan halaman statis index.html
app.use(express.static(__dirname + "/public"));

// Event saat klien terhubung
io.on("connection", (socket) => {
  console.log("Klien terhubung");

  // Event saat menerima pesan baru
  socket.on("message", (message) => {
    console.log("Pesan diterima: " + message);
    io.emit("message", message); // Mengirim pesan ke semua klien yang terhubung
  });

  // Event saat klien terputus
  socket.on("disconnect", () => {
    console.log("Klien terputus");
  });
});

// Menjalankan server
const port = 3000;
http.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
