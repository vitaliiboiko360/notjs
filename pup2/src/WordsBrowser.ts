import puppeteer from 'puppeteer';
import { logger } from './Logger';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.querySelectorAll(selector);
    console.log(`ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }
    console.log(`1 localInput ${localInput}\n${(ta[0])}`);
    let textArea = ta[0];
    wait(1000)
      .then(() => {
        textArea.setSelectionRange(0, localInput.split(' ')[0].length);
      });
  }, inputTextFieldBox, localInput);
  logger.info('after 1 evaluate');

  const seeDictButton = ".VfPpkd-StrnGf-rymPhb.DMZ54e.vQXW9e";
  const divOuterButtonSeeDictionary = "div.VfPpkd-xl07Ob-XxIAqe.VfPpkd-xl07Ob.q6oraf.P77izf.g4ZIhe.VfPpkd-xl07Ob-XxIAqe-OWXEXe-uxVfW-FNFY6c-uFfGwd.VfPpkd-xl07Ob-XxIAqe-OWXEXe-FNFY6c";
  await page.waitForSelector(divOuterButtonSeeDictionary, { visible: true })
    .then(async () => {
      await page.click(divOuterButtonSeeDictionary)
    });

  await page.waitForSelector(inputTextFieldBox, { visible: true });

  await wait(3000)
    .then(() => run(async () => await page.click(inputTextFieldBox)
      , 'click'));

  await page.evaluate((selector, localInput) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.getElementsByTagName('textarea');
    console.log(`2 ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }

    let endWordsBoundaries = localInput
      .split(' ')
      .reduce((accumulator: [number], word: string, index: number) => {
        accumulator.push((index > 0) ? word.length + accumulator[index - 1] : word.length);
        return accumulator;
      });

    let textArea = ta[0];
    endWordsBoundaries
      .forEach(async (endWordSelectionPosition: number, index: number, array: [number]) => {
        await wait(3000)
          .then(() => {
            let start = index > 0 ? array[index - 1] + 1 : 0; // +1 for space
            textArea.focus();
            textArea.setSelectionRange(start, endWordSelectionPosition);
          });
      });

  });

  return {};
}