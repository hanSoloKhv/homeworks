const { Container } = require("inversify");
require("reflect-metadata");
const BooksRepository = require("../src/BooksRepository");

const container = new Container();

container.bind(BooksRepository).toSelf();

module.exports = container;
