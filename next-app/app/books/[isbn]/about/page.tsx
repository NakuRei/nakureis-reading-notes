import getBooks from '@/app/_functions/getBooks';

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ isbn: String(book?.isbn) }));
}

interface Params {
  isbn: string;
}

export default async function BookAboutPage({ params }: { params: Params }) {
  return <div>{params.isbn} Book About</div>;
}
