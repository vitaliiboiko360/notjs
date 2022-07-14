const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
// const spawn = util.promisify(require('node:child_process').spawn);
const spawn = require('node:child_process').spawn;
const spawnSync = require('node:child_process').spawnSync;
var stream = require('stream');
const { start } = require('repl');

const json = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(json);

function startBr(config) {
    let cmd = `"${config.execPath}" ${config.cmdArgs.join(' ')}`;
    console.log(`running ${cmd}`);
    const child = spawn(config.execPath, config.cmdArgs, {
        detached: true,
        stdio: ['ignore', 'pipe', 'ignore']
    });
    
    var buffer = Buffer.alloc(0);
    child.stdout.on('data', (data)=>{
        console.log(`on data: ${data}`);
        // buffer = Buffer.concat([buffer, data]);
        // console.log(`on data: ${buffer.toString()}`);
    });

    console.log(`buffer: ${buffer.toString()}`);

    child.unref();
    
    return buffer.toString();
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

(function(){
    var output = startBr(config);
    console.log('startBr after');
    // console.log(output);
    
})();