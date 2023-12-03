import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ReactMarkdown from 'react-markdown';

import MainHeader from '@/app/_components/layouts/MainHeader';
import getBooks from '@/app/_functions/getBooks';
import { getBookByISBN } from '@/app/_functions/getBook';
import formatDate from '@/app/_functions/formatDate';
import getMarkdownContent from '@/app/_functions/getMarkdownContent';

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ isbn: String(book?.isbn) }));
}

interface Params {
  isbn: string;
}

export default async function Page({ params }: { params: Params }) {
  const book = await getBookByISBN(params.isbn);

  if (!book) {
    notFound();
  }

  const rakutenBooksUrl =
    process.env.RAKUTEN_AFFILIATE_RAKUTEN_BOOKS_URL ?? '/';

  return (
    <div>
      <MainHeader className="sticky top-0" />
      <main className="flex flex-col items-center p-10 gap-10">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full max-w-4xl">
          <figure className="flex-shrink-0 max-sm:flex max-sm:justify-center">
            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              width={150}
              height={210}
              priority={true}
            />
          </figure>
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-extrabold">{book.title}</h1>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <tbody>
                  <tr className="w-full">
                    <th className="w-1/4">著者</th>
                    <td>{book.authors?.join(', ') ?? '不明'}</td>
                  </tr>
                  <tr>
                    <th>出版社</th>
                    <td>{book.publisherName ?? '不明'}</td>
                  </tr>
                  <tr>
                    <th>出版日</th>
                    <td>{book.publishedDate ?? '不明'}</td>
                  </tr>
                  <tr>
                    <th>読了</th>
                    <td>
                      {book.finishDate
                        ? `${formatDate(book.finishDate)} 読了`
                        : '読書中'}
                    </td>
                  </tr>
                  <tr>
                    <th>ページ数</th>
                    <td>
                      {book.pageCount ? `${book.pageCount} ページ` : '不明'}
                    </td>
                  </tr>
                  <tr>
                    <th>カテゴリ</th>
                    <td>
                      <div className="flex flex-row gap-2">
                        {book.categories?.map((category) => (
                          <div
                            key={category}
                            className="badge badge-secondary min-w-max badge-sm"
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>購入価格</th>
                    <td className="flex flex-row justify-between items-center">
                      <p>{book.itemPrice ? `${book.itemPrice} 円` : '不明'}</p>
                      <a
                        href={book.buyUrl ?? rakutenBooksUrl}
                        className="btn btn-sm btn-accent sm:w-1/6"
                        target="_blank"
                        rel="noopener"
                        aria-label="Buy this book"
                      >
                        Buy
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-bold">読書メモたち</h2>
          <ul className="menu">
            <li>
              <Link href={`/books/${book.isbn}/about`}>所感</Link>
            </li>
            <li>
              <p className="menu-title">内容まとめ</p>
              <ul>
                {book?.chapters.map((chapter) => (
                  <li key={chapter}>
                    <Link href={`/books/${book.isbn}/${chapter}`}>
                      <ReactMarkdown allowedElements={['h1']}>
                        {getMarkdownContent(book.dirPath, chapter)}
                      </ReactMarkdown>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
