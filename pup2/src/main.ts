import puppeteer from 'puppeteer';
import process from 'node:process';
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
  let index = 0;
  const localInput = ["¿Te gusta leer?", "Yo leo un libro todas las semanas.", "Y a veces, leo dos libros."];
  const page = (await browser.pages())[0];
  await page.bringToFront();
  logger.info('Go to page');
  await page.goto('https://translate.google.com/', { waitUntil: 'load' });

  let result = await getWordsJson(page, localInput[index]);
  console.log(`\n${JSON.stringify(result)}\n`);
  while (true) {
    const answer: string = await rl.question('Run next iteration? type y if yes ');
    if (answer == 'y') {
      console.log('\n');
      let result = await getWordsJson(page, localInput[++index % localInput.length]);
      console.log(`\n${JSON.stringify(result)}\n`);
    }
    if (answer == 'q') {
      process.exit();
    }
  }
}

main();
