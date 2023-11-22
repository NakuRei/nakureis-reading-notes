import fs from 'fs';
import path from 'path';
import React from 'react';
import { notFound } from 'next/navigation';

import Markdown from 'react-markdown';
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

export default async function Article({ params }: { params: Params }) {
  const book = await getBookByISBN(params.isbn);
  if (!book) {
    notFound();
  }
  const markdown = await getMarkdownContent(book?.dirPath, params.chapter);
  return (
    <div className="max-w-4xl w-[90%] mx-auto my-10">
      <article className="prose prose-sm md:prose-base prose-strong:text-primary">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </article>
    </div>
  );
}
