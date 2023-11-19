import getBooks, { Book } from './getBooks';

export async function getBookByISBN(isbn: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((book) => book.isbn === isbn) || null;
}
