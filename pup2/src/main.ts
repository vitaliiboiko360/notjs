import puppeteer from 'puppeteer';
import process from 'node:process';
import { logger } from './Logger.js';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import getTranslations from './GetTranslation.js';

const rl = readline.createInterface({ input, output });

let config: { intpuFilePath: string, dbConfig: {} } = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

async function main() {

  let listOfTextsJson: { texts: [{ resource: string }] } = JSON.parse(fs.readFileSync(config.intpuFilePath, 'utf8'));
  let listOfTexts = listOfTextsJson.texts.map(item => item.resource);
  logger.info(`we found following texts: \n${listOfTexts.join('\n')}\n`);

  logger.info('Launching headless Chrome');
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/google-chrome',
    headless: false,
    userDataDir: '/home/user1/.config/google-chrome/Default',
    defaultViewport: null,
    devtools: true,
    args: [
      '--user-data-dir="/home/user1/.config/google-chrome/Default"',
      '--hide-crash-restore-bubble',
      '--disable-dev-shm-usage',
      '--fast-start',
      '--no-sandbox'
    ]
  });

  const page = (await browser.pages())[0];
  await page.bringToFront();

  logger.info('Go to page');

  await page.goto('https://translate.google.com/', { waitUntil: 'load' });


  let index = 0;
  while (true) {
    let fileName = listOfTexts[index++ % listOfTexts.length];
    const answer: string = await rl.question(`process file:\n\t"${fileName}"\npress y to proceed\n`);
    if (answer == 'y') {
      await getTranslations(page, fileName);
    }
    if (answer == 'q') {
      process.exit();
    }
  }
}

main();
