const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const config = fs.readFileSync('config.json', 'utf-8');
console.log(config);

async function startBr(config) {
    const { stdout, stderr } = await exec(`${config.osxExecPath} ${config.cmdArgs}`);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
}

async function doApp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(config.url);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
      headless: false,
      executablePath: config.osxExecPath,
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
};