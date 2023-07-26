const express = require("express");
const router = express.Router();
const fileMulter = require("../middleware/file");
const { books: allBooks } = require("../store");
const Book = require("../models/book");

router.get("/", (req, res) => {
  res.render("books/index", {
    title: "Книги",
    books: allBooks,
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Book | create",
    book: {},
  });
});

router.post("/create", fileMulter.single("fileBook"), (req, res) => {
  let fileBook = null;
  if (req.file) {
    fileBook = req.file.path;
  }
  const book = new Book({
    ...req.body,
    fileBook,
  });
  allBooks.push(book);
  res.redirect("/books");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      res.render("books/view", {
        title: allBooks[bookIdx].title,
        book: allBooks[bookIdx],
      });
    } else {
      res.status(404);
      res.render("errors/404", {
        title: "Book not found",
      });
    }
  } else {
    res.status(404);
    res.render("errors/404", {
      title: "Book not found",
    });
  }
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      res.render("books/update", {
        title: "Book | view",
        book: allBooks[bookIdx],
      });
    } else {
      res.status(404);
      res.render("errors/404", {
        title: "Book not found",
      });
    }
  } else {
    res.status(404);
    res.render("errors/404", {
      title: "Book not found",
    });
  }
});

router.post("/update/:id", fileMulter.single("fileBook"), (req, res) => {
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

      res.redirect(`/books/${id}`);
    } else {
      res.status(404);
      res.render("errors/404", {
        title: "Book not found",
      });
    }
  } else {
    res.status(404);
    res.render("errors/404", {
      title: "Book not found",
    });
  }
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      allBooks.splice(bookIdx, 1);

      res.redirect("/books");
    } else {
      res.status(404);
      res.render("errors/404", {
        title: "Book not found",
      });
    }
  } else {
    res.status(404);
    res.render("errors/404", {
      title: "Book not found",
    });
  }
});

module.exports = router;
