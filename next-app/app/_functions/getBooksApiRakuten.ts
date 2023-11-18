interface RakutenBook {
  isbn: string;
  title: string;
  author: string;
  publisherName: string;
  salesDate: string;
  itemCaption: string;
  itemPrice: number;
  imageUrl: string;
  affiliateUrl: string;
}

interface RakutenBookJson {
  Item: {
    affiliateUrl: string;
    author: string;
    isbn: string;
    itemCaption: string;
    itemPrice: number;
    largeImageUrl: string;
    mediumImageUrl: string;
    publisherName: string;
    salesDate: string;
    smallImageUrl: string;
    title: string;
  };
}

interface RakutenBooksApiResponse {
  Items: RakutenBookJson[];
}

export default async function getBooksApiRakuten(
  isbnJan: string,
): Promise<RakutenBook[]> {
  const endpoint = 'https://app.rakuten.co.jp/services/api/BooksTotal/Search';
  const format = 'json';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID;
  const applicationId = process.env.RAKUTEN_APPLICATION_ID;

  try {
    const response = await fetch(
      `${endpoint}/20170404?format=${format}&isbnjan=${isbnJan}&affiliateId=${affiliateId}&applicationId=${applicationId}`,
    );
    if (!response.ok) {
      console.error(
        `Error fetching book data for ISBN ${isbnJan}: ${response.status} ${response.statusText}`,
      );
      throw new Error('Failed to fetch books from Rakuten');
    }
    const jsonData: RakutenBooksApiResponse = await response.json();

    return jsonData.Items.map((elem: RakutenBookJson) => {
      const imageUrl =
        elem.Item.largeImageUrl ||
        elem.Item.mediumImageUrl ||
        elem.Item.smallImageUrl ||
        '';
      const imageUrlHttps = imageUrl.replace(/^http:/, 'https:');

      return {
        isbn: elem.Item.isbn,
        title: elem.Item.title,
        author: elem.Item.author,
        publisherName: elem.Item.publisherName,
        salesDate: elem.Item.salesDate,
        itemCaption: elem.Item.itemCaption,
        itemPrice: elem.Item.itemPrice,
        imageUrl: imageUrlHttps,
        affiliateUrl: elem.Item.affiliateUrl,
      };
    });
  } catch (error) {
    console.error(`Error in getBooksApiRakuten for ISBN ${isbnJan}:`, error);
    throw error;
  }
}
