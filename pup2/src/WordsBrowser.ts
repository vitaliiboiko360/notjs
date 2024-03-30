import puppeteer from 'puppeteer';
import { logger } from './Logger';

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function run(func: Function, message: string) {
  try {
    func();
  } catch {
    logger.info(message);
  }
}

export async function getWordsJson(page: puppeteer.Page, strInput: string): Promise<Object> {
  const inputTextFieldBox = '.QFw9Te textarea';
  const localInput = "¿Te gusta leer?";

  await page.waitForSelector(inputTextFieldBox, { visible: true });

  run(async () => await page.type(inputTextFieldBox, localInput), 'page.type');
  logger.info('after type');
  await page.evaluate((selector, localInput) => {
    let ta = document.querySelectorAll(selector);
    console.log(`ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }
    console.log(`localInput ${localInput}\n${(ta[0])}`);
    let textArea = ta[0];
    textArea.focus();
    localInput.split(' ').reduce((start: number, word: string, index: number) => {
      let end = start + word.length;
      setTimeout((start: number, end: number) => {

        textArea.setSelectionRange(start, end);
        textArea.focus();
        console.log(`setSelectionRange(${start}, ${end})`);
      }, 3000 * (index + 1), start, end);
      start = end;
      return start;
    }, 0);
  }, inputTextFieldBox, localInput);
  logger.info('after evaluate');
  return {};
}