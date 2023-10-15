const express = require("express");
const router = express.Router();
const container = require("../container");

router.get("/", async (_, res) => {
  try {
    const repo = container.get(BooksRepository);
    const books = repo.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);
    if (book?._id) {
      res.json(book);
    } else {
      res.status(404).json("Book not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const repo = container.get(BooksRepository);
    const newBook = repo.createBook({ ...req.body });

    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const result = await repo.updateBook({ _id: id }, { ...req.body });
    if (!result) {
      res.status(404).json("Book not found");
    } else {
      res.redirect(`/api/books/${id}`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    await repo.deleteBook({ _id: id });
    res.json("ok");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
