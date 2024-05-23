import puppeteer from 'puppeteer';
import { getWordsJson } from './WordsBrowser.js';
import loadJsonFileFromDb from './DBLoader.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { transport } from 'winston';
const rl = readline.createInterface({ input, output });

declare type translation = { originalLine: string, translation: {} };

export default async function getTranslations(page: puppeteer.Page, inputFileName: string): Promise<Object> {
  let inputJson: any = await loadJsonFileFromDb(inputFileName);
  let textLines = inputJson.lines.map((element: { text: string }) => element.text);

  let resultsJson: { translations: translation[] } = { translations: [] };
  for (let i = 0; i < textLines.length; ++i) {
    let inputString = textLines[i];
    let result = await getWordsJson(page, inputString);
    resultsJson.translations.push({ originalLine: inputString, translation: result });
  }
  console.log(resultsJson);
  return resultsJson;
}