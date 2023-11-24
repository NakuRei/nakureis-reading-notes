import fs from 'fs';
import path from 'path';
import React from 'react';
import { notFound } from 'next/navigation';

import { Book } from '@phosphor-icons/react/dist/ssr';

import { getBookByISBN } from '@/app/_functions/getBook';
import BookChaptersMenu from '@/app/_components/chapter/BookChaptersMenu';

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
    <div className="h-full w-full">
      <div className="max-lg:hidden flex flex-row h-full w-full">
        <BookChaptersMenu
          nowChapter={params.chapter}
          book={book}
          markdownContents={markdownContents}
        />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
      <div className="lg:hidden drawer">
        <input
          id="bookChaptersMenuDrawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="flex flex-row gap-5 sticky top-2 mx-10">
            <label
              htmlFor="bookChaptersMenuDrawer"
              className="btn btn-sm btn-neutral btn-outline bg-base-200"
            >
              <Book size={32} />本
            </label>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="bookChaptersMenuDrawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          {/* Sidebar content here */}
          <BookChaptersMenu
            book={book}
            nowChapter={params.chapter}
            markdownContents={markdownContents}
          />
        </div>
      </div>
    </div>
  );
}
