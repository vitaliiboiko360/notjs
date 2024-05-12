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

const translationDefinistionsSelector = '.Dwvecf';

export async function getWordsJson(page: puppeteer.Page, inputString: string): Promise<Object> {
  if (inputString.length == 0) {
    return {};
  }

  const inputTextFieldBox = '.QFw9Te textarea';
  const inputTextLanguageButtonPanel = 'div.akczyd';
  let inputTextArea = await page.waitForSelector(inputTextFieldBox, { visible: true });

  await inputTextArea.click({ clickCount: 3 });
  await inputTextArea.press('Backspace');
  run(async () => await page.type(inputTextFieldBox, inputString), 'page.type');

  await wait(2000)
    .then(async () => {
      await page.evaluate((buttonsPanelSelector) => {
        let panelNode = document.querySelector(buttonsPanelSelector);

        let buttonsNodes = panelNode?.querySelectorAll('button');
        let spanishButton = [...buttonsNodes].find(button => {
          return (button.textContent == 'Spanish'
            && button.getAttribute('aria-selected') == 'false'
          ) ? true : false;
        });
        if (spanishButton)
          spanishButton.click();
      }, inputTextLanguageButtonPanel);
    });

  await wait(2000);

  const selectFirstWord = async (selector: string, inputString: string) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let ta = document.querySelectorAll(selector);

    if (ta.length == 0) {
      return;
    }

    let textArea: HTMLInputElement = ta[0] as HTMLInputElement;
    await wait(1500)
      .then(() => {
        textArea.focus();
        textArea.setSelectionRange(0, inputString.split(' ')[0].length);
      });
  };

  await page.evaluate(selectFirstWord, inputTextFieldBox, inputString);

  const seeDictButton = ".VfPpkd-StrnGf-rymPhb.DMZ54e.vQXW9e";
  const clickSeeDictButon = async () => {
    await page.waitForSelector(seeDictButton, { visible: true, timeout: 5000 })
      .then(async () => {
        await page.click(seeDictButton)
      })
      .catch(async () => {

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

  let arrayOfTranslations = await getWordTranslations(page, inputString);
  let lineTranslation = await getSentenceTranslation(page);
  return { ...lineTranslation, 'translations': arrayOfTranslations };
}

export async function getWordTranslations(page: puppeteer.Page, inputString: string) {
  return await page.evaluate(async (localInput) => {

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    interface WordTranslations {
      originalWord: string,
      translations: Object
    };

    interface WordFullTranslations { partOfSpeech: string, words: WordTranslation[] };
    interface WordTranslation { englishWord: string, spanishWords: string, frequency: string };

    function getStringTranslations(): WordFullTranslations[] {
      let translationsNode = document.querySelector('div.GQpbTd');
      let translations: WordFullTranslations[] = [];
      if (!translationsNode) {
        return [{ partOfSpeech: '', words: [] }];
      }

      let tdadaElements = translationsNode.querySelectorAll('tbody');
      tdadaElements.forEach((tbody) => {
        let ret: WordFullTranslations = { partOfSpeech: '', words: [] };
        let tableRows = tbody.querySelectorAll('tr');
        tableRows.forEach(tr => {
          let wordTranslation: WordTranslation = { englishWord: '', spanishWords: '', frequency: '' };
          let tableHeader = tr.querySelectorAll('th');
          tableHeader.forEach(th => {
            if (th.classList.contains('yYp8Hb')) {
              ret['partOfSpeech'] = th.textContent || '';
            }
            if (th.classList.contains('S18kfe')) {
              wordTranslation['englishWord'] = th.textContent?.trim() || '';
            }
          });

          let tableData = tr.querySelectorAll('td');
          tableData.forEach((td) => {
            if (td.classList.contains('xex4Kc')) {
              wordTranslation['spanishWords'] = td.textContent || '';
            }
            if (td.classList.contains('ROtxYd')) {
              wordTranslation['frequency'] = td.textContent || '';
            }
          });
          ret['words'].push(wordTranslation);
        });
        translations.push(ret);
      });
      return translations.length ? translations : [{ partOfSpeech: '', words: [] }];
    };

    let ta = document.getElementsByTagName('textarea');
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
    let ret: WordTranslations[] = [];
    const selectEachWords = async () => {
      for (let index = 0; index < endWordsBoundaries.length; index++) {
        let endPos = endWordsBoundaries[index]
        await wait(2000)
          .then(async () => {
            let start = index > 0 ? endWordsBoundaries[index - 1] + index : 0; // +index for spaces
            let end = endPos + index;
            textArea.focus();
            textArea.setSelectionRange(start, end);
            let inputWord = localInput.substring(start, end);
            await wait(1500)
              .then(() => {
                let resultWordObj = getStringTranslations();
                ret.push({ 'originalWord': inputWord, 'translations': resultWordObj });
              });
          });
      }
    };
    await selectEachWords();
    return ret;
  }, inputString);
}

async function getSentenceTranslation(page: puppeteer.Page): Promise<Object> {
  return await page.evaluate(() => {
    const sentenceEnglishTranslation = 'sentenceEnglishTranslation';
    const translateSentenceSelector = 'ryNqvb';

    let retObj: { sentenceEnglishTranslation: string } = { sentenceEnglishTranslation: '' };
    let translateLineElements = document.getElementsByClassName(translateSentenceSelector);
    if (translateLineElements.length > 0) {
      retObj[sentenceEnglishTranslation] = translateLineElements[0].textContent || '';
    }
    return retObj;
  });
}