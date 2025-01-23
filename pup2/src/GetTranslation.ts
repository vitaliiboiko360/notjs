import puppeteer from 'puppeteer';
import { getWordsJson } from './WordsBrowser.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

declare type translation = { originalLine: string; translation: {} };

export default async function getAndLoadTranslations(
  page: puppeteer.Page,
  inputFileName: string
) {
  let inputJson: any = await fetchJsonFileFromDb(inputFileName);
  let textLines = inputJson.lines.map(
    (element: { text: string }) => element.text
  );

  let resultsJson: { translations: translation[] } = { translations: [] };
  for (let i = 0; i < textLines.length; ++i) {
    let inputString = textLines[i];
    let result = await getWordsJson(page, inputString);
    resultsJson.translations.push({
      originalLine: inputString,
      translation: result,
    });
  }
  saveJsonTranslationToDb(resultsJson, inputFileName);
}
