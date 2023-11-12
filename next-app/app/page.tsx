import Image from 'next/image';
import Link from 'next/link';

import getBooks from './_functions/getBooks';
import formatDate from './_functions/formatDate';

export default async function Home() {
  const books = await getBooks();
  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';

  return (
    <div>
      {books.map((book) => (
        <div key={book.isbn}>
          <div className="flex card card-bordered md:card-side bg-base-200 shadow-xl mx-[5%] lg:mx-[15%] my-10 py-5 pr-0 pl-0 md:pl-8">
            <figure className="flex-shrink-0">
              <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                width={150}
                height={210}
                className="w-[150px] h-[210px]"
                priority={true}
              />
            </figure>
            <div className="card-body flex-grow flex-shrink min-w-0">
              <h2 className="card-title">{book.title}</h2>
              <p>{book.publisherName}</p>
              <div className="flex flex-row gap-2">
                {book.categories?.map((category) => (
                  <div key={category} className="badge badge-secondary">
                    {category}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <p>
                    {book.finishDate
                      ? `${formatDate(book.finishDate)} 読了`
                      : '読了日不明'}
                  </p>
                </div>
                <div>
                  <p>
                    {book.pageCount
                      ? `${book.pageCount} ページ`
                      : 'ページ数不明'}
                  </p>
                </div>
                <div>
                  {book.itemPrice ? `${book.itemPrice} 円` : '価格不明'}
                </div>
              </div>
              <div className="card-actions justify-end">
                <Link href={`/books/${book.isbn}`} className="btn btn-primary">
                  {book.chapters ? book.chapters.length : 0} Notes
                </Link>
                <a
                  href={book.affiliateUrl ?? rakutenBooksUrl}
                  className="btn btn-accent"
                  target="_blank"
                  rel="noopener"
                  aria-label="Buy this book"
                >
                  Buy
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
