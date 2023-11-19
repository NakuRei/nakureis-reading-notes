import fs from 'fs';
import path from 'path';

function getDirsRecursively(
  dir: string,
  allDirs: string[] = [],
  parentDir = '',
) {
  const dirs = fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });

  dirs.forEach((subDir) => {
    const fullPath = path.join(dir, subDir);
    const relPath = parentDir ? path.join(parentDir, subDir) : subDir;

    // config.yamlが存在するか確認
    if (fs.existsSync(path.join(fullPath, 'config.yaml'))) {
      allDirs.push(relPath);
    } else {
      // サブディレクトリを探索
      getDirsRecursively(fullPath, allDirs, relPath);
    }
  });

  return allDirs;
}

export default function getBookDirs() {
  const booksDir = path.join(process.cwd(), '_books');
  return getDirsRecursively(booksDir).map((dir) => path.join('_books', dir));
}
