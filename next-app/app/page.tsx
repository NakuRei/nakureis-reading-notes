import Image from 'next/image';
import Link from 'next/link';

import getBooks from '@/app/_functions/getBooks';
import formatDate from '@/app/_functions/formatDate';

export default async function Home() {
  const books = await getBooks();
  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 max-w-[90%] px-10">
        {books.map((book) => (
          <div
            key={book.isbn}
            className="card bg-base-200 shadow-md rounded-lg border-[1px] border-neutral-400 border-opacity-60 m-3 flex flex-col justify-between px-2 pb-2 gap-2"
          >
            <div className="flex flex-col gap-2">
              <figure>
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={210}
                  priority={true}
                  className="h-[105px] sm:h-[140px] w-auto"
                />
              </figure>
              <h2 className="card-title text-sm">{book.title}</h2>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                {book.categories?.map((category) => (
                  <div key={category} className="badge badge-secondary">
                    {category}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm">
                  {book.finishDate
                    ? `${formatDate(book.finishDate)} 読了`
                    : '読書中'}
                </p>
              </div>
              <div className="flex flex-row justify-end gap-2">
                <Link
                  href={`/books/${book.isbn}`}
                  className="btn btn-sm btn-primary"
                >
                  {book.chapters ? book.chapters.length : 0} Notes
                </Link>
                <a
                  href={book.buyUrl ?? rakutenBooksUrl}
                  className="btn btn-sm btn-accent"
                  target="_blank"
                  rel="noopener"
                  aria-label="Buy this book"
                >
                  Buy
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
