import Image from 'next/image';
import Link from 'next/link';

import Book from '@/app/_types/Book';

interface BookSpineImagesProps {
  books: Book[];
}

export default function BookSpineImages(props: BookSpineImagesProps) {
  const books = props.books;

  return (
    <div className="flex justify-center overflow-auto px-10 sm:px-20 py-10">
      <div className="flex flex-row justify-start items-end gap-x-1 gap-y-10 w-full flex-wrap">
        {books.map((book) => (
          <Link key={book.isbn} href={`/books/${book.isbn}`}>
            <div className="flex flex-col justify-center items-center rounded-lg shadow-md shadow-neutral-600 overflow-hidden">
              {book.spineImage ? (
                <figure>
                  <Image
                    src={book.spineImage}
                    alt={`Cover of ${book.title}`}
                    width={25}
                    height={250}
                    priority={true}
                    className="h-auto w-9 object-contain"
                  ></Image>
                </figure>
              ) : (
                <div className="flex flex-col h-auto w-9 text-sm bg-base-300">
                  {book.title}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
