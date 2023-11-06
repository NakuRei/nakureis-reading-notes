import Image from 'next/image';
import Link from 'next/link';

import getBooks from './_functions/getBooks';

export default async function Home() {
  const books = await getBooks();
  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <div className="flex card card-bordered  card-side bg-base-200 shadow-xl mx-[5%] my-10 p-5 pl-8">
            <figure className="flex-shrink-0">
              <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                width={128}
                height={192}
              />
            </figure>
            <div className="card-body flex-grow flex-shrink min-w-0">
              <h2 className="card-title">{book.title}</h2>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p>
                    {book.publishedDate
                      ? `${book.publishedDate} 出版`
                      : '出版日不明'}
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
                  Notes
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
