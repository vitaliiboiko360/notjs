const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const spawn = require('node:child_process').spawn;

const json = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(json);
console.log(config);

async function startBr(config) {
    let cmd = `${config.execPath} ${config.cmdArgs}`;
    console.log(`running ${cmd}`);
    const child = spawn(config.execPath, config.cmdArgs, {
        detached: true,
        stdio: 'pipe'
    });
    
    var subProcOutput = Buffer.alloc(0);
    child.stdout.on('data', (data) => {
        console.log(`Received chunk ${data}`);
        let offset = 0;
        offset = offset + subProcOutput.write(data, offset);
    });
    child.unref();
    console.error('stderr:', stderr);
    console.log('end of startBr');
    console.log(subProcOutput);
}

async function doApp(config) {
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
      executablePath: config.execPath,
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
};

var output = startBr(config).then((data)=>{
    console.log('startBr then');
    console.log(data);
    console.log(output);
    //doApp(data);
});