const { v4: uuid } = require("uuid");

module.exports = {
  users: [{ id: 1, mail: "test@mail.ru" }],
  books: [
    {
      id: uuid(),
      title: "Book 1",
      description: "Description",
      authors: "Author",
      favorite: "favorite",
      fileCover: "fileCover",
      fileName: "book_1",
      fileBook: null,
    },
  ],
};
