import puppeteer from 'puppeteer';
import { getWordsJson } from './WordsBrowser';
import loadJsonFileFromDb from './DBLoader';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

export default async function getTranslations(page: puppeteer.Page, inputFileName: string) {
  let inputJson: any = await loadJsonFileFromDb(inputFileName);
  let textLines = inputJson.lines.map(element: { text: string } => element.text);

  let index = 0;
  while (true) {
    let inputString = textLines[++index];
    let result = await getWordsJson(page, inputString);
    console.log(`\n${JSON.stringify(result, null, 2)}\n`);
    const answer: string = await rl.question(`to continue press y\n`);
    if (answer != 'y') {
      break;
    }
  }
}