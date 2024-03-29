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

  let elementHandle = await page.waitForSelector(inputTextFieldBox, { visible: true });

  run(async () => await page.type(inputTextFieldBox, "¿Te gusta leer?"), 'page.type');

  //await page.waitForSelector(inputTextFieldBox, { visible: true });
  await elementHandle.focus();

  await page.evaluate(textarea => textarea.setSelectionRange(0, 3), elementHandle);
  logger.info('after evaluate');
  return {};
}