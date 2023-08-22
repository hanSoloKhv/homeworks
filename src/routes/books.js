const express = require("express");
const router = express.Router();
const Books = require("../models/book");

router.get("/", async (_, res) => {
  try {
    const books = await Books.find().select("-__v");
    res.json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id).select("-__v");

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
    const newBook = new Books({ ...req.body });

    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Books.findOneAndUpdate({ _id: id }, { ...req.body });
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

    await Books.deleteOne({ _id: id });
    res.json("ok");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
