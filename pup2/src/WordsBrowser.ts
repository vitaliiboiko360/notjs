import puppeteer from 'puppeteer';
import { logger } from './Logger';
import { log } from 'winston';

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

const translationDefinistionsSelector = '.Dwvecf';

export async function getWordsJson(page: puppeteer.Page, inputString: string): Promise<Object> {
  if (inputString.length == 0) {
    return {};
  }

  const inputTextFieldBox = '.QFw9Te textarea';

  const inputTextLanguageButtonPanel = 'div.akczyd';

  let inputTextArea = await page.waitForSelector(inputTextFieldBox, { visible: true });

  logger.info('before clear');
  await inputTextArea.click({ clickCount: 3 });
  await inputTextArea.press('Backspace');
  logger.info('after clear & before type');
  run(async () => await page.type(inputTextFieldBox, inputString), 'page.type');

  await wait(2000)
    .then(async () => {
      await page.evaluate((buttonsPanelSelector) => {
        let panelNode = document.querySelector(buttonsPanelSelector);

        let buttonsNodes = panelNode?.querySelectorAll('button');
        let spanishButton = [...buttonsNodes].find(button => {
          if (button.textContent == 'Spanish') {
            return true;
          }
          return false;
        });
        spanishButton.click();
      }, inputTextLanguageButtonPanel);
    });

  await wait(2000)
    .then(() => {
      logger.info('after type');
    });

  const selectFirstWord = async (selector: string, inputString: string) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.querySelectorAll(selector);
    console.log(`ta length ${ta.length}`);
    if (ta.length == 0) {
      return;
    }
    console.log(`1 inputString ${inputString}\n${(ta[0])}`);
    let textArea: HTMLInputElement = ta[0] as HTMLInputElement;
    await wait(1500)
      .then(() => {
        textArea.focus();
        textArea.setSelectionRange(0, inputString.split(' ')[0].length);
      });
  };

  await page.evaluate(selectFirstWord, inputTextFieldBox, inputString);
  logger.info('after 1 evaluate');

  const seeDictButton = ".VfPpkd-StrnGf-rymPhb.DMZ54e.vQXW9e";
  const divOuterButtonSeeDictionary = "div.VfPpkd-xl07Ob-XxIAqe.VfPpkd-xl07Ob.q6oraf.P77izf.g4ZIhe.VfPpkd-xl07Ob-XxIAqe-OWXEXe-uxVfW-FNFY6c-uFfGwd.VfPpkd-xl07Ob-XxIAqe-OWXEXe-FNFY6c";
  const clickSeeDictButon = async () => {
    await page.waitForSelector(seeDictButton, { visible: true, timeout: 5000 })
      .then(async () => {
        await page.click(seeDictButton)
      })
      .catch(async () => {
        console.log(`no click button found`);
        await wait(2000)
          .then(() => run(async () => await page.click(inputTextFieldBox)
            , 'click'));
        await page.evaluate(selectFirstWord, inputTextFieldBox, inputString);
        try {
          await page.waitForSelector(translationDefinistionsSelector, { visible: true, timeout: 1000 });
        } catch {
          await clickSeeDictButon();
        }
      });
  };

  try {
    await page.waitForSelector(translationDefinistionsSelector, { visible: true, timeout: 1000 });
  } catch {
    await clickSeeDictButon();
  }

  await page.waitForSelector(inputTextFieldBox, { visible: true });

  await wait(3000)
    .then(() => run(async () => await page.click(inputTextFieldBox)
      , 'click'));

  await selectEachWordConsequntly(page, inputString);
  console.log(`we done with for loop with await`);

  getSentenceTranslation(page);
  return {};
}

export async function selectEachWordConsequntly(page: puppeteer.Page, inputString: string) {
  await page.evaluate(async (localInput) => {
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

    let textArea = ta[0];
    const selectEachWords = async () => {
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
    };
    await selectEachWords();
  }, inputString);
}

async function getSentenceTranslation(page: puppeteer.Page): Promise<Object> {
  return await page.evaluate(() => {
    const wholeSentenceTranslation = 'wholeSentenceTranslation';
    const translateSentenceSelector = 'ryNqvb';

    let retObj: { wholeSentenceTranslation: string } = { wholeSentenceTranslation: '' };
    let translateLineElements = document.getElementsByClassName(translateSentenceSelector);
    if (translateLineElements.length > 0) {
      retObj[wholeSentenceTranslation] = translateLineElements[0].textContent || '';
    }
    return retObj;
  });
}

async function getWordTranslations(page: puppeteer.Page, word: string): Promise<Object> {
  return await page.evaluate((word) => {
    let retObj: Object = { 'word': word };
    let transDefsNodes = document.querySelectorAll(translationDefinistionsSelector);

    let translations = [...transDefsNodes].find((element) => {
      let header = element.querySelector('h3.nYkDR');
      if (header?.textContent?.includes('Translations')) {
        return true;
      }
    });

    if (translations) {

    }

    return retObj;
  }, word);
}