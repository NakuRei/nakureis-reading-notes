type Book = {
  isbn: string;
  dirPath: string;
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: string;
  itemPrice: number;
  coverImage: string;
  spineImage: string | null;
  buyUrl: string;
  pageCount: number;
  categories: string[];
  finishDate: Date;
  chapters: string[];
};

export default Book;
