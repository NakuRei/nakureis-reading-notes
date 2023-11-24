import fs from 'fs';
import path from 'path';

import getConfigFromYaml from './getConfigFromYaml';
import getBookDirs from './getBookDirs';
import formatDate from './formatDate';

export interface Book {
  isbn: string;
  dirPath: string;
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: string;
  itemPrice: number;
  image: string;
  buyUrl: string;
  pageCount: number;
  categories: string[];
  finishDate: Date;
  chapters: string[];
}

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
    const defaultCoverPath = '/static/images/book-cover.webp';
    const image = fs.existsSync(coverImagePath)
      ? `/${bookDirPath}/cover.webp`
      : defaultCoverPath;

    return {
      isbn: yamlResult.value.isbn,
      dirPath: bookDirPath,
      title: yamlResult.value.title,
      authors: yamlResult.value.authors,
      publisherName: yamlResult.value.publisherName,
      publishedDate: formatDate(yamlResult.value.publishedDate),
      itemPrice: yamlResult.value.itemPrice,
      image: image,
      buyUrl: yamlResult.value.buyUrl,
      pageCount: yamlResult.value.pageCount,
      categories: yamlResult.value.categories,
      finishDate: yamlResult.value.finishDate,
      chapters: yamlResult.value.chapters,
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
