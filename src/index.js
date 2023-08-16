const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const errorNotFound = require("./middleware/404");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/books", booksRouter);

app.use(errorNotFound);

app.listen(port, () => {
  console.log(`Server listenen on ${port}`);
});
