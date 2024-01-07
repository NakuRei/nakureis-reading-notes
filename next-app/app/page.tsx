import {
  Book,
  Books,
  SquaresFour,
  Table,
} from '@phosphor-icons/react/dist/ssr';

import MainHeader from './_components/layouts/MainHeader';
import TabSwitcher from '@/app/_components/home/TabSwitcher';
import BookInfoCards from '@/app/_components/home/BookInfoCards';
import BookImageCards from '@/app/_components/home/BookImageCards';
import BookSpineImages from '@/app/_components/home/BookSpineImages';
import BooksTable from '@/app/_components/home/BooksTable';
import getBooks from '@/app/_functions/getBooks';

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="bg-base-100 w-full">
      <MainHeader />

      <main>
        <TabSwitcher
          className="sticky top-0 flex flex-wrap justify-center"
          tabs={[
            {
              name: 'Cards',
              content: <BookInfoCards books={books} />,
              icon: <SquaresFour size={20} />,
            },
            {
              name: 'Covers',
              content: <BookImageCards books={books} />,
              icon: <Book size={20} />,
            },
            {
              name: 'Spines',
              content: <BookSpineImages books={books} />,
              icon: <Books size={20} />,
            },
            {
              name: 'Table',
              content: <BooksTable books={books} />,
              icon: <Table size={20} />,
            },
          ]}
        />
      </main>
    </div>
  );
}
