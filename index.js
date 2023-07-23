const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const errorNotFound = require("./middleware/404");

app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/books", booksRouter);

app.use(errorNotFound);

app.listen(3000);
