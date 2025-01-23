import puppeteer from 'puppeteer';
import { getWordsJson } from './WordsBrowser.js';
import { readJsonFromFileSync, saveJsonToFileSync } from './fs/Json.js';

declare type translation = { originalLine: string; translation: {} };

export default async function getAndLoadTranslations(
  page: puppeteer.Page,
  inputFileName: string
): Promise<void> {
  const inputJson: any = await readJsonFromFileSync(inputFileName);
  const textLines = inputJson.lines.map(
    (element: { text: string }) => element.text
  );

  const resultsJson: { translations: Array<translation> } = {
    translations: [],
  };
  for (let i = 0; i < textLines.length; ++i) {
    const inputString = textLines[i];
    const result = await getWordsJson(page, inputString);
    resultsJson.translations.push({
      originalLine: inputString,
      translation: result,
    });
  }
  saveJsonToFileSync(inputFileName, resultsJson);
}
