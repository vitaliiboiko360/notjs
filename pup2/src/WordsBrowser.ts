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
    if (ta.length == 0) {
      return;
    }
    let textArea = ta[0];
    localInput.split(' ').reduce(async (start: number, word: string) => {
      let end = start + word.length;
      textArea.setSelectionRange(start, end);
      await wait(3000);
    });
  }, inputTextFieldBox, localInput);
  logger.info('after evaluate');
  return {};
}