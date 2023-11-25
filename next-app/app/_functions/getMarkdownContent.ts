import fs from 'fs';
import path from 'path';

export default function getMarkdownContent(dirPath: string, chapter: string) {
  try {
    const markdownPath = path.join(process.cwd(), dirPath, `${chapter}.md`);
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    return markdownContent;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}
