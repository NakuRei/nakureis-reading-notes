import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface LocalConfigYaml {
  categories: string[];
  finish: Date;
  chapters: string[];
}

interface LocalBookConfig {
  categories: string[];
  finish: Date;
  chapterCount: number;
}

export default async function getConfigFromYaml(
  isbn: string,
): Promise<LocalBookConfig> {
  // ローカルの config.yaml を読み込む
  const contentsPath = path.join(
    process.cwd(),
    `app/_contents/${isbn}/config.yaml`,
  );
  let localBookData: LocalConfigYaml;
  try {
    localBookData = yaml.load(
      fs.readFileSync(contentsPath, 'utf8'),
    ) as LocalConfigYaml;
  } catch (e) {
    console.error(`Failed to read or parse config.yaml for ISBN: ${isbn}`, e);
    throw new Error(`Failed to read or parse config.yaml for ISBN: ${isbn}`);
  }

  // 必要なデータを抽出
  const categories = localBookData.categories;
  const finish = localBookData.finish;
  const chapterCount = localBookData.chapters.length;

  return {
    categories: categories,
    finish: finish,
    chapterCount: chapterCount,
  };
}
