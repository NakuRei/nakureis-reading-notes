import fs from 'fs';
import path from 'path';

import getConfigFromYaml from './getConfigFromYaml';
import getBookDirs from './getBookDirs';
import formatDate from './formatDate';
import Book from '../_types/Book';

export async function getBookInfo(bookDirPath: string): Promise<Book | null> {
  try {
    const [yamlResult] = await Promise.allSettled([
      getConfigFromYaml(bookDirPath),
    ]);

    if (yamlResult.status === 'rejected') {
      throw new Error(`Failed to read or parse config.yaml: ${bookDirPath}`);
    }

    const coverImagePath = path.join(
      process.cwd(),
      'public',
      bookDirPath,
      'cover.webp',
    );
    const defaultCoverImagePath = '/static/images/book-cover.webp';
    const coverImage = fs.existsSync(coverImagePath)
      ? `/${bookDirPath}/cover.webp`
      : defaultCoverImagePath;

    const spineImagePath = path.join(
      process.cwd(),
      'public',
      bookDirPath,
      'spine.webp',
    );
    const spineImage = fs.existsSync(spineImagePath)
      ? `/${bookDirPath}/spine.webp`
      : null;

    yamlResult.value.chapters.push('about');

    const records = yamlResult.value.records
      ? yamlResult.value.records.map((record) => {
          const startPage = record.pages.reduce((a, b) => Math.min(a, b));
          const endPage = record.pages.reduce((a, b) => Math.max(a, b));
          return {
            date: record.date,
            pages: {
              start: startPage,
              end: endPage,
            },
          };
        })
      : null;

    return {
      isbn: yamlResult.value.isbn,
      dirPath: bookDirPath,
      title: yamlResult.value.title,
      authors: yamlResult.value.authors,
      publisherName: yamlResult.value.publisherName,
      publishedDate: formatDate(yamlResult.value.publishedDate),
      itemPrice: yamlResult.value.itemPrice,
      coverImage: coverImage,
      spineImage: spineImage,
      buyUrl: yamlResult.value.buyUrl,
      pageCount: yamlResult.value.pageCount,
      categories: yamlResult.value.categories,
      finishDate: yamlResult.value.finishDate,
      chapters: yamlResult.value.chapters,
      records: records,
    };
  } catch (error) {
    console.error(`Failed to retrieve book: ${bookDirPath}`, error);
    return null; // エラーが起きた場合にnullを返す
  }
}

export default async function getBooks(): Promise<Book[]> {
  const bookDirs = getBookDirs();

  const bookInfoPromises = bookDirs.map(getBookInfo);
  const bookInfos = await Promise.all(bookInfoPromises);

  // エラーを含む可能性のあるnullをフィルタリング
  const filteredBooks = bookInfos.filter((book): book is Book => book !== null);

  // finishDateの日付が新しい順にソート
  const sortedBooks = filteredBooks.sort((a, b) => {
    // finishDateが未定義の場合、比較のために最新の日付を使用する
    const dateA = a.finishDate || new Date();
    const dateB = b.finishDate || new Date();
    // 日付を比較してソート
    return dateB.getTime() - dateA.getTime();
  });

  return sortedBooks;
}
