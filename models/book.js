const { v4: uuid } = require("uuid");

class Book {
  constructor(params) {
    this.id = uuid();
    this.title = params?.title || null;
    this.description = params?.description || null;
    this.authors = params?.authors || null;
    this.favorite = params?.favorite || null;
    this.fileCover = params.fileCover || null;
    this.fileName = params.fileName || null;
    this.fileBook = params.fileBook || null;
  }
}

module.exports = Book;
