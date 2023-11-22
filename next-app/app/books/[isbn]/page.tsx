import Link from 'next/link';
import { notFound } from 'next/navigation';

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

  if (!book) {
    notFound();
  }

  return (
    <div>
      <h2>Book</h2>
      <p>ISBN: {params.isbn}</p>
      <p>Title: {book?.title}</p>
      <p>Categories: {book?.categories}</p>
      {book?.chapters.map((chapter) => (
        <div key={chapter}>
          <Link href={`/books/${book.isbn}/${chapter}`}>{chapter}</Link>
        </div>
      ))}
    </div>
  );
}
