import Image from 'next/image';
import Link from 'next/link';

import Book from '@/app/_types/Book';
import formatDate from '@/app/_functions/formatDate';

interface BookInfoCardProps {
  book: Book;
}

function BookInfoCard(props: BookInfoCardProps) {
  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';
  const book = props.book;

  return (
    <div className="bg-base-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg border-[1px] border-neutral-400 border-opacity-60 flex flex-col justify-between gap-2 m-4 px-4 pb-4">
      <div className="flex flex-col gap-2">
        <figure className="flex justify-center">
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
            <div key={category} className="badge badge-secondary min-w-max">
              {category}
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm">
            {book.finishDate ? `${formatDate(book.finishDate)} 読了` : '読書中'}
          </p>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Link
            href={`/books/${book.isbn}`}
            className="btn btn-sm btn-primary min-w-max"
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
  );
}

interface BookInfoCardsProps {
  books: Book[];
}

export default function BookInfoCards(props: BookInfoCardsProps) {
  return (
    <div className="flex justify-center overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 max-w-[90%] px-10 py-4">
        {props.books.map((book) => (
          <BookInfoCard key={book.isbn} book={book} />
        ))}
      </div>
    </div>
  );
}
