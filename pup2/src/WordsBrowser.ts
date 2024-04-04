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

  // if (buttonElementHandle) {
  //   console.log('buttonElementHandle')
  //   await buttonElementHandle.click();
  // }
  // const outerDivTextArea = 'div.QFw9Te';
  let intpuTextArea = await page.waitForSelector(inputTextFieldBox, { visible: true });

  // run(async () => await page.focus(inputTextFieldBox), 'focus');

  // run(async () => await page.click(inputTextFieldBox), 'click(inputTextFieldBox)');
  // await page.evaluateHandle(textArea => textArea.focus(), intpuTextArea);
  await wait(3000)
    .then(() => run(async () => await page.click(inputTextFieldBox)
      , 'click'));
  // await page.evaluateHandle(textArea => textArea.click(), intpuTextArea);

  await page.evaluate((selector, localInput) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.getElementsByTagName('textarea');
    console.log(`ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }
    console.log(`2`);
    console.log(document.activeElement);

    let textArea = ta[0];

    console.log(document.activeElement);

    localInput
      .split(' ')
      .reduce(
        async (prevPromise: Promise<number>, word: string, index: number, array: [string]) => {
          let start = await prevPromise;
          return wait(3000).then(
            () => {
              let end = start + word.length;
              console.log(`setSelectionRange(${start}, ${end})`);
              textArea.focus();
              textArea.setSelectionRange(start, end);

              return end + 1;
            });
        }, Promise.resolve(0));
  }, inputTextFieldBox, localInput);

  return {};
}