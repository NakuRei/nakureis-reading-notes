import getBooksApiGoogle from './getBooksApiGoogle';
import getBooksApiRakuten from './getBooksApiRakuten';
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
}

async function getBookInfo(isbn: string): Promise<Book | null> {
  try {
    const [googleResult, rakutenResult] = await Promise.allSettled([
      getBooksApiGoogle(`isbn:${isbn}`),
      getBooksApiRakuten(isbn),
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
  return bookInfos.filter((book): book is Book => book !== null);
}
