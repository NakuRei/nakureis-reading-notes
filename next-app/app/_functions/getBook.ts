import getBooks from './getBooks';
import Book from '../_types/Book';

export async function getBookByISBN(isbn: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((book) => book.isbn === isbn) || null;
}
