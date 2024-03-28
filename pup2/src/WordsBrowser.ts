import puppeteer from 'puppeteer';
import { logger } from './Logger';

function run(func: Function, message: string) {
  try {
    func();
  } catch {
    logger.info(message);
  }
}

export async function getWordsJson(page: puppeteer.Page, strInput: string): Promise<Object> {
  const inputTextFieldBox = '.QFw9Te textarea';

  run(async () => await page.waitForSelector(inputTextFieldBox, {
    visible: true
  }), 'page.waitForSelector');

  run(async () => await page.type(inputTextFieldBox, "¿Te gusta leer?"), 'page.type');

  return {};
}