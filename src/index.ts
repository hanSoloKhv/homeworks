interface IBook {
    id: string;
    title?: string;
    description?: string;
    authors?: string;
    favorite?: string;
    fileCover?: string;
    fileName?: string;
    fileBook?: string;
}

abstract class BooksRepository {
    abstract createBook(book: IBook): IBook
    abstract getBook(id: string): IBook
    abstract getBooks(): IBook
    abstract updateBook(id: string): IBook
    abstract deleteBook(id: string): string
}