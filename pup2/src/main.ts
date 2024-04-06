import puppeteer from 'puppeteer';
import { logger } from './Logger';
import { getWordsJson } from './WordsBrowser';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

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
      '--no-sandbox'
    ]
  });

  const page = (await browser.pages())[0];
  await page.bringToFront();
  logger.info('Go to page');
  await page.goto('https://translate.google.com/', { waitUntil: 'load' });
  getWordsJson(page, '');
  while (true) {
    const answer: string = await rl.question('Run iteration again? type y if yes');
    if (answer == 'y') {
      getWordsJson(page, '');
    }
  }
}

main();
