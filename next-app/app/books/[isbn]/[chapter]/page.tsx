import { notFound } from 'next/navigation';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

import TocLinkLi from '@/app/_components/markdown/TocLinkLi';
import CustomH2 from '@/app/_components/markdown/CustomH2';
import CustomPre from '@/app/_components/markdown/CustomPre';
import customCode from '@/app/_components/markdown/CustomCode';
import getBooks from '@/app/_functions/getBooks';
import { getBookByISBN } from '@/app/_functions/getBook';
import getMarkdownContent from '@/app/_functions/getMarkdownContent';

export async function generateStaticParams() {
  const books = await getBooks();
  return books.flatMap((book) =>
    book.chapters.map((chapter) => ({
      isbn: String(book.isbn),
      chapter,
    })),
  );
}

interface ArticleParams {
  isbn: string;
  chapter: string;
}

export default async function Article({ params }: { params: ArticleParams }) {
  const book = await getBookByISBN(params.isbn);
  if (!book) {
    notFound();
  }

  const markdown = getMarkdownContent(book.dirPath, params.chapter);

  return (
    <div className="w-full flex flex-row justify-center gap-10 xl:gap-20 p-10">
      <article className="prose prose-sm md:prose-base prose-strong:text-primary max-md:max-w-none w-full">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{ h2: CustomH2, code: customCode, pre: CustomPre }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
      <ul className="max-lg:hidden sticky top-10 menu min-w-[250px] max-w-[250px] h-max max-h-[50vh] overflow-y-auto p-2 shadow bg-base-200 text-base-content rounded-box">
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
  );
}
