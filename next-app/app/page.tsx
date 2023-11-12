import Image from 'next/image';
import Link from 'next/link';

import getBooks from '@/app/_functions/getBooks';

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[5%] md:gap-[5%] lg:gap-10 mx-7 sm:mx-20 lg:mx-20 my-[5%] md:my-7 lg:my-10 max-w-[1024px]">
        {books.map((book) => (
          <Link key={book.isbn} href={`/books/${book.isbn}`}>
            <div className="flex flex-col justify-center items-center rounded-lg shadow-md shadow-neutral-600 overflow-hidden">
              <figure className="w-full mx-auto">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={210}
                  className="w-full h-auto object-contain"
                  priority={true}
                />
              </figure>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
