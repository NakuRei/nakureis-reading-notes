import fs from 'fs';
import path from 'path';

import getBooksDirPath from './getBooksDirPath';

export default function getIsbnDirectories(): string[] {
  const booksDirPath = getBooksDirPath();
  const isbnDirectories = fs.readdirSync(booksDirPath).filter((file) => {
    return fs.statSync(path.join(booksDirPath, file)).isDirectory();
  });
  return isbnDirectories;
}
