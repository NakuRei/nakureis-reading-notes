import { notFound } from 'next/navigation';

import ReactMarkdown from 'react-markdown';
import { BookBookmark, BookmarksSimple } from '@phosphor-icons/react/dist/ssr';

import MainHeader from '@/app/_components/layouts/MainHeader';
import BookChaptersMenu from '@/app/_components/chapter/BookChaptersMenu';
import TocLinkLi from '@/app/_components/markdown/TocLinkLi';
import { getBookByISBN } from '@/app/_functions/getBook';
import getMarkdownContent from '@/app/_functions/getMarkdownContent';

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

  const markdown = getMarkdownContent(book.dirPath, params.chapter);

  const markdownContents = book?.chapters.map((chapter) => ({
    chapter: chapter,
    contents: getMarkdownContent(book?.dirPath, chapter),
  }));

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="bookChaptersMenuDrawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center w-full">
        {/* Page content here */}
        <MainHeader
          className="lg:hidden sticky top-0"
          buttons={
            <>
              <label
                htmlFor="bookChaptersMenuDrawer"
                aria-label="open sidebar"
                className="btn btn-circle btn-ghost"
              >
                <BookBookmark size={24} />
              </label>
              <div className="dropdown dropdown-bottom dropdown-end mr-3">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <BookmarksSimple size={24} />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-200 text-base-content rounded-box w-64"
                >
                  <li>
                    <h2 className="menu-title">目次</h2>
                    <ul>
                      <ReactMarkdown
                        allowedElements={['h2']}
                        components={{ h2: TocLinkLi }}
                      >
                        {markdown}
                      </ReactMarkdown>
                    </ul>
                  </li>
                </ul>
              </div>
            </>
          }
        />
        <main className="w-full">{children}</main>
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
  );
}
