import puppeteer from 'puppeteer';
import { logger } from './Logger';

async function main() {
  logger.info('Launching headless Chrome');

  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/google-chrome',
    headless: false,
    userDataDir: '/home/user1/.config/google-chrome/Default',
    defaultViewport: null,
    args: [
      '--user-data-dir="/home/user1/.config/google-chrome/Default"',
      '--disable-dev-shm-usage',
      '--fast-start',
      '--no-sandbox'
    ]
  });

  const page = (await browser.pages())[0];

  logger.info('Go to page');
  await page.goto('https://translate.google.com/', { waitUntil: 'load' });

}

main();
