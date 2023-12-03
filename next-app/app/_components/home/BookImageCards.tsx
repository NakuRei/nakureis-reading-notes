import Image from 'next/image';
import Link from 'next/link';

import Book from '@/app/_types/Book';

interface BookImageCardsProps {
  books: Book[];
}

export default function BookImageCards(props: BookImageCardsProps) {
  const books = props.books;

  return (
    <div className="flex justify-center overflow-auto">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-[5%] lg:gap-10 mx-7 sm:mx-20 my-[5%] md:my-7 lg:my-10 max-w-[90%]">
        {books.map((book) => (
          <Link key={book.isbn} href={`/books/${book.isbn}`}>
            <div className="flex flex-col justify-center items-center rounded-lg shadow-md shadow-neutral-600 overflow-hidden">
              <figure>
                <Image
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={210}
                  priority={true}
                  className="h-auto w-auto object-contain"
                ></Image>
              </figure>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
