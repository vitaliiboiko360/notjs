import puppeteer from 'puppeteer';
import { logger } from './Logger';

async function main() {
  logger.info('Launching headless Chrome to perform the OpenID Connect dance...');

  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/google-chrome',
    headless: false,
    userDataDir: '/home/user1/.config/google-chrome/Default',
    args: [
      '--user-data-dir="/home/user1/.config/google-chrome/Default"',
      '--disable-dev-shm-usage',
      '--fast-start',
      '--no-sandbox'
    ]
  });

  const page = (await browser.pages())[0];

  logger.info('Navigating to login page...');
  await page.goto('https://translate.google.com/', { waitUntil: 'load' });
}

main();
