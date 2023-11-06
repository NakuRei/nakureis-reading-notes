interface RakutenBook {
  affiliateUrl: string;
  itemPrice: number;
}

interface RakutenBookJson {
  Item: {
    affiliateUrl: string;
    itemPrice: number;
  };
}

interface RakutenBooksApiResponse {
  Items: RakutenBookJson[];
}

export default async function getBooksApiRakuten(
  isbnjan: string,
): Promise<RakutenBook[]> {
  const endpoint = 'https://app.rakuten.co.jp/services/api/BooksTotal/Search';
  const format = 'json';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID;
  const applicationId = process.env.RAKUTEN_APPLICATION_ID;
  const response = await fetch(
    `${endpoint}/20170404?format=${format}&isbnjan=${isbnjan}&affiliateId=${affiliateId}&applicationId=${applicationId}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch books from Rakuten');
  }
  const jsonData: RakutenBooksApiResponse = await response.json();

  return jsonData.Items.map((elem: RakutenBookJson) => {
    return {
      affiliateUrl: elem.Item.affiliateUrl,
      itemPrice: elem.Item.itemPrice,
    };
  });
}
