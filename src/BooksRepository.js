const Books = require("../models/book");

class BooksRepository {
  createBook(book) {
    return new Books(...book);
  }
  async getBook(id) {
    return await Books.findById(id).select("-__v");
  }
  async getBooks() {
    return await Books.find().select("-__v");
  }
  async updateBook(id, params) {
    return await Books.findOneAndUpdate({ _id: id }, { ...params });
  }
  async deleteBook(id) {
    return await Books.deleteOne({ _id: id });
  }
}
