import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface LocalConfigYaml {
  isbn: string;
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: Date;
  itemPrice: number;
  pageCount: number;
  categories: string[];
  finishDate: Date;
  buyUrl: string;
  chapters: string[];
}

interface LocalBookConfig {
  isbn: string;
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: Date;
  itemPrice: number;
  pageCount: number;
  categories: string[];
  finishDate: Date;
  buyUrl: string;
  chapters: string[];
}

export default async function getConfigFromYaml(
  bookDirPath: string,
): Promise<LocalBookConfig> {
  const yamlPath = path.join(bookDirPath, 'config.yaml');
  let localBookData: LocalConfigYaml;
  try {
    localBookData = yaml.load(
      fs.readFileSync(yamlPath, 'utf8'),
    ) as LocalConfigYaml;
  } catch (e) {
    console.error(`Failed to read or parse config.yaml: ${yamlPath}`, e);
    throw new Error(`Failed to read or parse config.yaml: ${yamlPath}`);
  }

  return {
    isbn: localBookData.isbn,
    title: localBookData.title,
    authors: localBookData.authors,
    publisherName: localBookData.publisherName,
    publishedDate: localBookData.publishedDate,
    itemPrice: localBookData.itemPrice,
    pageCount: localBookData.pageCount,
    categories: localBookData.categories,
    finishDate: localBookData.finishDate,
    buyUrl: localBookData.buyUrl,
    chapters: localBookData.chapters,
  };
}
