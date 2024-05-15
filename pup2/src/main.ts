import puppeteer from 'puppeteer';
import process from 'node:process';
import { logger } from './Logger';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import getTranslations from './GetTranslation';

import path from 'node:path';

const rl = readline.createInterface({ input, output });

async function main() {

  // config 
  //
  let config = fs.readFileSync(__dirname + '/../config.conf', 'utf8');
  let listOfTextsJson: { texts: [{ resource: string }] } = JSON.parse(fs.readFileSync(config, 'utf8'));
  let listOfTexts = listOfTextsJson.texts.map(item => item.resource);
  logger.info(`we found followind texts: \n${listOfTexts.join('\n')}\n`);

  const answer: string = await rl.question('type y to stop script\n');
  if (answer == 'y') {
    process.exit();
  }

  // browser
  //
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

  let fileFolder = path.dirname(config);

  let index = 0;
  while (true) {
    let fileName = listOfTexts[index++];
    let filePath = path.join(fileFolder, fileName + '.json');

    const answer: string = await rl.question(`process file:\n\t"${filePath}"\npress y to proceed\n`);
    if (answer == 'y') {
      await getTranslations(page);
    }
    if (answer == 'q') {
      process.exit();
    }
  }
}

main();
