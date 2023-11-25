import MainHeader from '@/app/_components/layouts/MainHeader';
import BookImageCards from '@/app/_components/home/BookImageCards';
import getBooks from '@/app/_functions/getBooks';

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div>
      <MainHeader className="sticky top-0" />;
      <main>
        <BookImageCards books={books} />
      </main>
    </div>
  );
}
