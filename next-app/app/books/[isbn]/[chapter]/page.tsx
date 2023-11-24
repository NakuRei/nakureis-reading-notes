import fs from 'fs';
import path from 'path';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import getBooks from '@/app/_functions/getBooks';
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

export async function generateStaticParams() {
  const books = await getBooks();
  return books.flatMap((book) =>
    book.chapters.map((chapter) => ({
      isbn: String(book.isbn),
      chapter,
    })),
  );
}

interface Params {
  isbn: string;
  chapter: string;
}

function TocContent(props: JSX.IntrinsicElements['h2'] & ExtraProps) {
  const title =
    props.node && 'value' in props.node.children[0]
      ? props.node.children[0].value
      : '';
  return (
    <li>
      <Link href={`#${title}`} className="text-sm">
        {props.children}
      </Link>
    </li>
  );
}

function customH2(props: JSX.IntrinsicElements['h2'] & ExtraProps) {
  const title =
    props.node && 'value' in props.node.children[0]
      ? props.node.children[0].value
      : '';
  return (
    <Link className="text-inherit no-underline" id={title} href={`#${title}`}>
      <h2>{props.children}</h2>
    </Link>
  );
}

export default async function Article({ params }: { params: Params }) {
  const book = await getBookByISBN(params.isbn);
  if (!book) {
    notFound();
  }

  const markdownContents = book?.chapters.map((chapter) => ({
    chapter: chapter,
    contents: getMarkdownContent(book?.dirPath, chapter),
  }));
  const markdown = markdownContents.find(
    (contents) => contents.chapter === params.chapter,
  )?.contents;

  return (
    <div className="flex flex-row gap-10 p-10 w-full justify-center">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:hidden collapse collapse-arrow bg-base-200 border border-base-300 max-h-64">
          <input type="checkbox" />
          <div className="collapse-title">目次</div>
          <div className="collapse-content overflow-auto">
            <ReactMarkdown
              allowedElements={['h2']}
              components={{ h2: TocContent }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>

        <article className="prose prose-sm md:prose-base prose-strong:text-primary max-md:max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ h2: customH2 }}
          >
            {markdown}
          </ReactMarkdown>
        </article>

        <div className="max-lg:hidden sticky top-10 min-w-[250px] max-w-[250px] h-max max-h-[50vh] overflow-y-auto bg-base-200 rounded-lg p-4">
          <div className="text-base font-bold">目次</div>
          <div className="px-0 pt-2">
            <ReactMarkdown
              allowedElements={['h2']}
              components={{ h2: TocContent }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
