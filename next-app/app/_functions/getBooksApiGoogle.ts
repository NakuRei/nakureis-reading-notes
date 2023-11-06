interface GoogleBook {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  isbn: string;
  pageCount: number | null;
  image: string;
}

interface GoogleBookJson {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    pageCount: number;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface GoogleBooksApiResponse {
  items: GoogleBookJson[];
}

export default async function getBooksApiGoogle(
  query: string,
): Promise<GoogleBook[]> {
  const endpoint = 'https://www.googleapis.com/books/v1';
  const response = await fetch(`${endpoint}/volumes?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch books from Google');
  }
  const jsonData: GoogleBooksApiResponse = await response.json();

  return jsonData.items.map((elem: GoogleBookJson) => {
    const isbn13 = elem.volumeInfo?.industryIdentifiers?.find(
      (elem) => elem.type === 'ISBN_13',
    );
    const isbn10 = elem.volumeInfo?.industryIdentifiers?.find(
      (elem) => elem.type === 'ISBN_10',
    );
    const isbn = isbn13?.identifier || isbn10?.identifier || '';

    return {
      id: elem.id,
      title: elem.volumeInfo?.title,
      authors: elem.volumeInfo?.authors,
      publishedDate: elem.volumeInfo?.publishedDate,
      description: elem.volumeInfo?.description,
      isbn: isbn,
      pageCount: elem.volumeInfo?.pageCount,
      image: elem.volumeInfo?.imageLinks?.thumbnail,
    };
  });
}
