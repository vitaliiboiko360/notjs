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


    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    localInput
      .split(' ')
      .reduce(
        async (prevPromise: Promise<number>, word: string, index: number, array: [string]) => {
          let start = await prevPromise;
          return wait(3000).then(
            () => {
              console.log(`new promise index=${index}`);
              // let start = (index > 0)
              //   ? array.slice(0, index)
              //     .reduce(
              //       (t: number, v: string): number => {
              //         return t + v.length + 1; /*+1 for space*/
              //       }, 0
              //     )
              //   : 0;
              let end = start + word.length;
              textArea.focus();
              textArea.setSelectionRange(start, end);
              console.log(`setSelectionRange(${start}, ${end})`);
              return end + 1;
            });
        }, Promise.resolve(0));

  }, inputTextFieldBox, localInput);

  logger.info('after evaluate');
  return {};
}