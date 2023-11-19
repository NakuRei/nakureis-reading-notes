import getBooks from '@/app/_functions/getBooks';
import { getBookByISBN } from '@/app/_functions/getBook';

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ isbn: String(book?.isbn) }));
}

interface Params {
  isbn: string;
}

export default async function Page({ params }: { params: Params }) {
  const book = await getBookByISBN(params.isbn);

  return (
    <div>
      <h2>Book</h2>
      <p>ISBN: {params.isbn}</p>
      <p>Title: {book?.title}</p>
      <p>Categories: {book?.categories}</p>
    </div>
  );
}
