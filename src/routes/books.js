const express = require("express");
const router = express.Router();
const fileMulter = require("../middleware/file");
const { books: allBooks } = require("../store");
const Book = require("../models/book");
const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:81";
const axios = require("axios");

router.get("/", (req, res) => {
  console.log("COUNTER_URL", process.env.COUNTER_URL);
  res.json(allBooks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      const { data } = await axios.post(`${COUNTER_URL}/counter/${id}/incr`);

      res.json({
        ...allBooks[bookIdx],
        counterValue: data.value,
      });
    } else {
      res.status(404);
      res.json("Book not found");
    }
  } else {
    res.status(404);
    res.json("Book not found");
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      if (allBooks[bookIdx].fileBook) {
        const file = `${allBooks[bookIdx].fileBook}`;
        res.download(file);
      } else {
        res.status(404);
        res.json("fileBook not found");
      }
    } else {
      res.status(404);
      res.json("Book not found");
    }
  } else {
    res.status(404);
    res.json("Book not found");
  }
});

router.post("/", fileMulter.single("fileBook"), (req, res) => {
  let fileBook = null;
  if (req.file) {
    fileBook = req.file.path;
  }
  const book = new Book({
    ...req.body,
    fileBook,
  });
  allBooks.push(book);
  res.json(book);
});

router.put("/:id", fileMulter.single("fileBook"), (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      allBooks[bookIdx] = {
        ...allBooks[bookIdx],
        ...req.body,
      };

      if (req.file) {
        allBooks[bookIdx].fileBook = req.file.path;
      }

      res.json(allBooks[bookIdx]);
    } else {
      res.status(404);
      res.json("Book not found");
    }
  } else {
    res.status(404);
    res.json("Book not found");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      allBooks.splice(bookIdx, 1);

      res.json("ok");
    } else {
      res.status(404);
      res.json("Book not found");
    }
  } else {
    res.status(404);
    res.json("Book not found");
  }
});

module.exports = router;
