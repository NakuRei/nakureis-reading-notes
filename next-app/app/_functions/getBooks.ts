import fs from 'fs';
import path from 'path';

import getBooksApiRakuten from './getBooksApiRakuten';
import getConfigFromYaml from './getConfigFromYaml';
import getIsbnDirectories from './getIsbnDirectories';

import formatDate from './formatDate';

interface Book {
  isbn: string;
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: string;
  itemCaption: string;
  itemPrice: number;
  image: string;
  affiliateUrl: string;

  pageCount: number;
  categories: string[];
  finishDate: Date;
  chapters: string[];
}

async function getBookInfo(isbn: string): Promise<Book | null> {
  try {
    const [rakutenResult, yamlResult] = await Promise.allSettled([
      getBooksApiRakuten(isbn),
      getConfigFromYaml(isbn),
    ]);

    const rakutenBook =
      rakutenResult.status === 'fulfilled' ? rakutenResult.value[0] : null;

    if (!rakutenBook) {
      throw new Error(`Rakuten API failed to retrieve book for ISBN: ${isbn}`);
    }
    if (yamlResult.status === 'rejected') {
      throw new Error(`Failed to read or parse config.yaml for ISBN: ${isbn}`);
    }

    const coverImagePath = path.join(
      process.cwd(),
      'public',
      'books',
      isbn,
      'cover.webp',
    );
    const defaultCoverPath = '/static/images/book-cover.webp';
    const image = fs.existsSync(coverImagePath)
      ? `/books/${isbn}/cover.webp`
      : rakutenBook.imageUrl || defaultCoverPath;

    return {
      isbn: isbn,
      title: yamlResult.value.title || rakutenBook.title,
      authors: yamlResult.value.authors || rakutenBook.author.split('/'),
      publisherName:
        yamlResult.value.publisherName || rakutenBook.publisherName,
      publishedDate:
        formatDate(yamlResult.value.publishedDate) || rakutenBook.salesDate,
      itemCaption: rakutenBook.itemCaption,
      itemPrice: yamlResult.value.itemPrice || rakutenBook.itemPrice,
      image: image,
      affiliateUrl: rakutenBook.affiliateUrl,
      pageCount: yamlResult.value.pageCount,
      categories: yamlResult.value.categories,
      finishDate: yamlResult.value.finishDate,
      chapters: yamlResult.value.chapters,
    };
  } catch (error) {
    console.error(`Failed to retrieve book for ISBN: ${isbn}`, error);
    return null; // エラーが起きた場合にnullを返す
  }
}

export default async function getBooks(): Promise<Book[]> {
  const isbnDirectories = getIsbnDirectories();

  const bookInfoPromises = isbnDirectories.map(getBookInfo);
  const bookInfos = await Promise.all(bookInfoPromises);

  // エラーを含む可能性のあるnullをフィルタリング
  const filteredBooks = bookInfos.filter((book): book is Book => book !== null);

  // finishDateの日付が新しい順にソート
  const sortedBooks = filteredBooks.sort((a, b) => {
    // finishDateが未定義の場合、比較のために最古の日付を使用する
    const dateA = a.finishDate || new Date(0);
    const dateB = b.finishDate || new Date(0);
    // 日付を比較してソート
    return dateB.getTime() - dateA.getTime();
  });

  return sortedBooks;
}
