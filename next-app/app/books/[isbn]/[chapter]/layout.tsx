import fs from 'fs';
import path from 'path';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ReactMarkdown from 'react-markdown';

import { getBookByISBN } from '@/app/_functions/getBook';

function getMarkdownContent(dirPath: string, chapter: string) {
  try {
    const markdownPath = path.join(process.cwd(), dirPath, `${chapter}.md`);
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    return markdownContent;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    isbn: string;
    chapter: string;
  };
}) {
  const book = await getBookByISBN(params.isbn);
  if (!book) {
    notFound();
  }

  const markdownContents = book?.chapters.map((chapter) => ({
    chapter: chapter,
    contents: getMarkdownContent(book?.dirPath, chapter),
  }));

  return (
    <div className="flex flex-row h-full w-full">
      <div className="max-lg:hidden sticky top-0 flex flex-col h-full overflow-y-auto min-w-[250px] w-[250px] bg-base-200 flex-nowrap">
        <ul className="menu">
          <li>
            <Link
              href={`/books/${book?.isbn}`}
              className="grid grid-cols-3 gap-4"
            >
              <figure>
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={210}
                  priority={true}
                  className="h-auto w-auto object-contain"
                ></Image>
              </figure>
              <p className="text-sm font-bold col-span-2">{book?.title}</p>
            </Link>
          </li>
          {book?.chapters.map((chapter, index) => (
            <li key={chapter}>
              <Link href={`/books/${book.isbn}/${chapter}`} className="text-sm">
                <div>{('00' + (index + 1)).slice(-2)}</div>
                <ReactMarkdown allowedElements={['h1']}>
                  {
                    markdownContents.filter(
                      (contents) => contents.chapter === chapter,
                    )[0].contents
                  }
                </ReactMarkdown>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
