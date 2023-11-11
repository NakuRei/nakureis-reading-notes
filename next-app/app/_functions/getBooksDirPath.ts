import path from 'path';

export default function getBooksDirPath(): string {
  return path.join(process.cwd(), '_books');
}
