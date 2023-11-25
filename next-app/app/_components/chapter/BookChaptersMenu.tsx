import Image from 'next/image';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';

import MainHeader from '@/app/_components/layouts/MainHeader';
import Book from '@/app/_types/Book';

interface BookChaptersMenuProps {
  book: Book;
  nowChapter: string;
  markdownContents: {
    chapter: string;
    contents: string | null;
  }[];
  className?: string;
}

export default function BookChaptersMenu(props: BookChaptersMenuProps) {
  return (
    <div
      className={`h-full overflow-y-auto w-64 bg-base-200 text-base-content ${props.className}`}
    >
      <MainHeader />
      <ul className="menu">
        <li>
          <Link
            href={`/books/${props.book.isbn}`}
            className="grid grid-cols-3 gap-4"
          >
            <figure>
              <Image
                src={props.book.image}
                alt={`Cover of ${props.book.title}`}
                width={150}
                height={210}
                priority={true}
                className="h-auto w-auto object-contain"
              ></Image>
            </figure>
            <p className="text-sm font-bold col-span-2">{props.book.title}</p>
          </Link>
        </li>
        {props.book.chapters.map((chapter, index) => (
          <li key={chapter}>
            <Link
              href={`/books/${props.book.isbn}/${chapter}`}
              // className="text-sm"
              className={`${
                chapter === props.nowChapter ? 'active' : ''
              } text-sm`}
            >
              <div>{('00' + (index + 1)).slice(-2)}</div>
              <ReactMarkdown allowedElements={['h1']}>
                {
                  props.markdownContents.find(
                    (contents) => contents.chapter === chapter,
                  )?.contents
                }
              </ReactMarkdown>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
