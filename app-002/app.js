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

var url = {
    ready: false,
    url: ''    
};
function startBr(config) {
    let cmd = `"${config.execPath}" ${config.cmdArgs.join(' ')}`;
    console.log(`running ${cmd}`);
    const child = spawn(config.execPath, config.cmdArgs, {
        detached: true,
        stdio: ['ignore', 'ignore', 'pipe']
    });
    child.unref();
    
    const re = new RegExp('ws:[^ ]*');
    var buffer = [];
    var output = Buffer.alloc(0);
    child.stderr.on('data', (data)=>{
        let match = re.exec(data.toString());
        if(match) { url.ready = true; url.url = match[0]; };
    });
}

async function getUrl() {
    let output = await startBr();
    console.log(output);
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
    startBr(config);
    console.log('startBr after');
    
    let id = setInterval(()=>{
        if (url.ready) {
            console.log(`we have url ${url.url}`);
            console.log('we are ready');
            clearInterval(id);
        } else console.log('...waiting for url');
    },1000);
    
})();