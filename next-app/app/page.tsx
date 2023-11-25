import { Book, SquaresFour } from '@phosphor-icons/react/dist/ssr';

import MainHeader from './_components/layouts/MainHeader';
import TabSwitcher from '@/app/_components/home/TabSwitcher';
import BookInfoCards from '@/app/_components/home/BookInfoCards';
import BookImageCards from '@/app/_components/home/BookImageCards';
import getBooks from '@/app/_functions/getBooks';

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="bg-base-100">
      <MainHeader />

      <main>
        <TabSwitcher
          className="sticky top-0 flex justify-center"
          tabs={[
            {
              name: 'Cards',
              content: <BookInfoCards books={books} />,
              icon: <SquaresFour size={20} />,
            },
            {
              name: 'Books',
              content: <BookImageCards books={books} />,
              icon: <Book size={20} />,
            },
          ]}
        />
      </main>
    </div>
  );
}
