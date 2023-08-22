const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./routes/books");
const errorNotFound = require("./middleware/404");
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
const app = express();

app.use(express.json());

app.use("/api/books", booksRouter);

app.use(errorNotFound);

async function start(port, dbUrl) {
  try {
    await mongoose.connect(dbUrl);

    app.listen(port, () => {
      console.log(dbUrl);
      
      console.log(`Server listenen on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start(port, dbUrl);
