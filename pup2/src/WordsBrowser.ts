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

  const selectFirstWord = async (selector: string, localInput: string) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.querySelectorAll(selector);
    console.log(`ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }
    console.log(`1 localInput ${localInput}\n${(ta[0])}`);
    let textArea: HTMLInputElement = ta[0] as HTMLInputElement;
    await wait(1500)
      .then(() => {
        textArea.setSelectionRange(0, localInput.split(' ')[0].length);
      });
  };

  await page.evaluate(selectFirstWord, inputTextFieldBox, localInput);
  logger.info('after 1 evaluate');

  const seeDictButton = ".VfPpkd-StrnGf-rymPhb.DMZ54e.vQXW9e";
  const divOuterButtonSeeDictionary = "div.VfPpkd-xl07Ob-XxIAqe.VfPpkd-xl07Ob.q6oraf.P77izf.g4ZIhe.VfPpkd-xl07Ob-XxIAqe-OWXEXe-uxVfW-FNFY6c-uFfGwd.VfPpkd-xl07Ob-XxIAqe-OWXEXe-FNFY6c";
  const clickSeeDictButon = async () => {
    console.log('in the clickSeeDictButon');
    await page.waitForSelector(seeDictButton, { visible: true })
      .then(async () => {
        console.log('in the clickSeeDictButon.waitForSelector.then');
        await page.click(seeDictButton)
      });
  };

  try {
    console.log('in the try');
    await clickSeeDictButon();
  } catch {
    console.log('in the catch');
    await page.evaluate(selectFirstWord, inputTextFieldBox, localInput);
    await clickSeeDictButon();
  }

  await page.waitForSelector(inputTextFieldBox, { visible: true });

  await wait(3000)
    .then(() => run(async () => await page.click(inputTextFieldBox)
      , 'click'));

  selectEachWordConsequntly(page, localInput);
  return {};
}

export async function selectEachWordConsequntly(page: puppeteer.Page, inputString: string) {
  await page.evaluate((localInput) => {
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
      }, []);

    console.log(endWordsBoundaries);

    let textArea = ta[0];
    (async () => {
      for (let index = 0; index < endWordsBoundaries.length; index++) {
        let endPos = endWordsBoundaries[index]
        await wait(3000)
          .then(() => {
            let start = index > 0 ? endWordsBoundaries[index - 1] + index : 0; // +index for spaces
            let end = endPos + index;
            console.log(`setSelectionRange ${start} ${end}`);
            textArea.focus();
            textArea.setSelectionRange(start, end);
          });
      }
    })();

  }, inputString);
}