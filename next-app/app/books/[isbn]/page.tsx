import getIsbnDirectories from '@/app/_functions/getIsbnDirectories';

export async function generateStaticParams() {
  const isbnDirectories = getIsbnDirectories();
  return isbnDirectories.map((isbn) => ({
    isbn: isbn,
  }));
}

interface Params {
  isbn: string;
}

export default function Page({ params }: { params: Params }) {
  const { isbn } = params;
  return (
    <div>
      <h2>Book</h2>
      <p>ISBN: {isbn}</p>
    </div>
  );
}
