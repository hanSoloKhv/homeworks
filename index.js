const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.Server(app);
const io = socketIO(server);
app.set("view engine", "ejs");
const booksRouter = require("./routes/books");
const errorNotFound = require("./middleware/404");

app.use(express.urlencoded());

app.use("/books", booksRouter);

app.use(errorNotFound);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000);
