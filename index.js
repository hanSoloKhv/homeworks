const express = require("express");
const app = express();
app.set("view engine", "ejs");
const booksRouter = require("./routes/books");
const errorNotFound = require("./middleware/404");

app.use(express.urlencoded());

app.use("/books", booksRouter);

app.use(errorNotFound);

app.listen(3000);
