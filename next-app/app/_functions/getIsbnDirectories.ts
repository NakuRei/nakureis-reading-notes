import fs from 'fs';
import path from 'path';

export default function getIsbnDirectories(): string[] {
  const contentsDirectory = path.join(process.cwd(), 'app/_contents');
  const isbnDirectories = fs.readdirSync(contentsDirectory).filter((file) => {
    return fs.statSync(path.join(contentsDirectory, file)).isDirectory();
  });
  return isbnDirectories;
}
