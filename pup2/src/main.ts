import puppeteer from 'puppeteer';
import process from 'node:process';
import { logger } from './Logger.js';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import getAndLoadTranslations from './GetTranslation.js';

const rl = readline.createInterface({ input, output });

let config: { intpuFilePath: string; dbConfig: {} } = JSON.parse(
  fs.readFileSync('./config.json', 'utf8')
);

async function main() {
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
      '--no-sandbox',
    ],
  });

  const page = (await browser.pages())[0];
  await page.bringToFront();

  logger.info('Go to page');

  await page.goto('https://translate.google.com/', { waitUntil: 'load' });

  let listOfTextsJson: { texts: [{ resource: string }] } = JSON.parse(
    fs.readFileSync(config.intpuFilePath, 'utf8')
  );
  let listOfTexts = listOfTextsJson.texts.map((item) => item.resource);

  logger.info(`we found following texts: \n${listOfTexts.join('\n')}\n`);

  for (let i = 0; i < listOfTexts.length; i++) {
    let fileName = listOfTexts[i];
    await getAndLoadTranslations(page, fileName);
  }

  process.exit();
}

main();
