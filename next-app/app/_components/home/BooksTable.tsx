import Link from 'next/link';

import Book from '@/app/_types/Book';
import formatDate from '@/app/_functions/formatDate';

interface BooksTableProps {
  books: Book[];
}

export default function BooksTable(props: BooksTableProps) {
  const books = props.books;

  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Published Date</th>
            <th>Categories</th>
            <th>Finished Date</th>
            <th>Notes</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.isbn}>
              <th>{book.title}</th>
              <td>{book.authors?.join(', ') ?? '不明'}</td>
              <td>{book.publisherName ?? '不明'}</td>
              <td>{book.publishedDate ?? '不明'}</td>
              <td>
                <div className="flex flex-col gap-1">
                  {book.categories?.map((category) => (
                    <div
                      key={category}
                      className="badge badge-secondary min-w-max badge-sm"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </td>
              <td>
                {book.finishDate
                  ? `${formatDate(book.finishDate)} 読了`
                  : '読書中'}
              </td>
              <td>
                <Link
                  href={`/books/${book.isbn}`}
                  className="btn btn-xs btn-primary min-w-max"
                >
                  {book.chapters ? book.chapters.length : 0} Notes
                </Link>
              </td>
              <td>
                <a
                  href={book.buyUrl ?? rakutenBooksUrl}
                  className="btn btn-xs btn-accent"
                  target="_blank"
                  rel="noopener"
                  aria-label="Buy this book"
                >
                  Buy
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
