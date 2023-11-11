import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import getBooksDirPath from './getBooksDirPath';

interface LocalConfigYaml {
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: Date;
  itemPrice: number;
  pageCount: number;
  categories: string[];
  finishDate: Date;
  chapters: string[];
}

interface LocalBookConfig {
  title: string;
  authors: string[];
  publisherName: string;
  publishedDate: Date;
  pageCount: number;
  itemPrice: number;
  categories: string[];
  finishDate: Date;
  chapters: string[];
}

export default async function getConfigFromYaml(
  isbn: string,
): Promise<LocalBookConfig> {
  const booksDirPath = getBooksDirPath();
  const contentsPath = path.join(booksDirPath, `${isbn}/config.yaml`);
  let localBookData: LocalConfigYaml;
  try {
    localBookData = yaml.load(
      fs.readFileSync(contentsPath, 'utf8'),
    ) as LocalConfigYaml;
  } catch (e) {
    console.error(`Failed to read or parse config.yaml for ISBN: ${isbn}`, e);
    throw new Error(`Failed to read or parse config.yaml for ISBN: ${isbn}`);
  }

  return {
    title: localBookData.title,
    authors: localBookData.authors,
    publisherName: localBookData.publisherName,
    publishedDate: localBookData.publishedDate,
    pageCount: localBookData.pageCount,
    itemPrice: localBookData.itemPrice,
    categories: localBookData.categories,
    finishDate: localBookData.finishDate,
    chapters: localBookData.chapters,
  };
}
