const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const json = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(json);
console.log(config);

async function startBr(config) {
    let cmd = `${config.osxExecPath} ${config.cmdArgs}`;
    console.log(`running ${cmd}`);
    const { stdout, stderr } = await exec(cmd).then((child)=>{
        child.unref();
    });
    console.error('stderr:', stderr);
    return stdout;
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

startBr(config).then((data)=>{
    console.log(data);
});