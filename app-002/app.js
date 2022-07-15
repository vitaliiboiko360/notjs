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
        if(match) { 
            url.ready = true; 
            url.url = match[0]; 
        };
    });
}

async function doApp(config, ws) {
  console.log(`doApp started with ${ws}`);
  const browser = await puppeteer.connect({browserWSEndpoint:ws});
  const page = await browser.newPage();
  await page.goto(config.url, {waitUntil: 'networkidle2'});

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log('Dimensions:', dimensions);
};

(function(){
    startBr(config);
    console.log('startBr after');
    
    let id = setInterval(()=>{
        if (url.ready) {
            console.log(`we have url ${url.url}`);
            console.log('start')
            clearInterval(id);
            doApp(config, url.url);
        }
    },1000);

})();