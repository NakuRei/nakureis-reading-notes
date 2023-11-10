import getBooksApiGoogle from './getBooksApiGoogle';
import getBooksApiRakuten from './getBooksApiRakuten';
import getConfigFromYaml from './getConfigFromYaml';
import getIsbnDirectories from './getIsbnDirectories';

interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  isbn: string;
  pageCount: number | null;
  image: string;

  affiliateUrl?: string;
  itemPrice?: number;

  categories?: string[];
  finishDate?: Date;
  chapterCount?: number;
}

async function getBookInfo(isbn: string): Promise<Book | null> {
  try {
    const [googleResult, rakutenResult, yamlResult] = await Promise.allSettled([
      getBooksApiGoogle(`isbn:${isbn}`),
      getBooksApiRakuten(isbn),
      getConfigFromYaml(isbn),
    ]);

    const googleBook =
      googleResult.status === 'fulfilled' ? googleResult.value[0] : null;
    const rakutenBook =
      rakutenResult.status === 'fulfilled' ? rakutenResult.value[0] : null;

    if (!googleBook) {
      throw new Error(`Google API failed to retrieve book for ISBN: ${isbn}`);
    }
    if (!rakutenBook) {
      console.warn(`Rakuten API failed to retrieve book for ISBN: ${isbn}`);
    }
    if (yamlResult.status === 'rejected') {
      throw new Error(`Failed to read or parse config.yaml for ISBN: ${isbn}`);
    }

    return {
      id: googleBook.id,
      title: googleBook.title,
      authors: googleBook.authors,
      publishedDate: googleBook.publishedDate,
      description: googleBook.description,
      isbn: googleBook.isbn,
      pageCount: googleBook.pageCount,
      image: googleBook.image,
      affiliateUrl: rakutenBook?.affiliateUrl,
      itemPrice: rakutenBook?.itemPrice,
      categories: yamlResult.value.categories,
      finishDate: yamlResult.value.finishDate,
      chapterCount: yamlResult.value.chapterCount,
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
