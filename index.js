const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

const allUsers = [{ id: 1, mail: "test@mail.ru" }];

const allBooks = [
  {
    id: uuid(),
    title: "Book 1",
    description: "Description",
    authors: "Author",
    favorite: "favorite",
    fileCover: "fileCover",
    fileName: "book_1",
  },
];

class Book {
  constructor(params) {
    this.id = uuid();
    this.title = params?.title || null;
    this.description = params?.description || null;
    this.authors = params?.authors || null;
    this.favorite = params?.favorite || null;
    this.fileCover = params.fileCover || null;
    this.fileName = params.fileName || null;
  }
}

app.use(express.json());

app.post("/api/user/login", (req, res) => {
  const { login, password } = req.body;

  if (login && password) {
    const userIdx = allUsers.findIndex((user) => user.mail === login);

    if (userIdx >= 0) {
      res.status(201);
      res.json(allUsers[userIdx]);
    } else {
      res.status(401);
      res.json("Auth error");
    }
  } else {
    res.status(401);
    res.json("Auth error");
  }
});

app.get("/api/books", (req, res) => {
  res.json(allBooks);
});

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
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

app.post("/api/books", (req, res) => {
  const book = new Book(req.body);
  allBooks.push(book);
  res.json(book);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const bookIdx = allBooks.findIndex((book) => book.id === id);
    if (bookIdx >= 0) {
      allBooks[bookIdx] = {
        ...allBooks[bookIdx],
        ...req.body,
      };

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

app.delete("/api/books/:id", (req, res) => {
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

app.listen(3000);
