import puppeteer from 'puppeteer-extra';
import process from 'node:process';
import { logger } from './Logger.js';

import path from 'node:path';
import fs from 'node:fs';
import getAndLoadTranslations from './GetTranslation.js';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

import StealthPlugin from 'puppeteer-extra-plugin-stealth';

async function main() {
  logger.info('Launching headless Chrome');

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/google-chrome',
    headless: false,
    userDataDir: '/home/user1/.config/google-chrome/Default',
    defaultViewport: null,
    devtools: false,
    // ignoreDefaultArgs: ['--enable-automation'],
    args: [
      // '--app=https://translate.google.com/',
      '--no-default-browser-check',
      '--enable-automation',
      '--hide-crash-restore-bubble',
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
