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
    const browser = await puppeteer.connect({browserWSEndpoint:ws, defaultViewport: null});

    var page;
    const pages = await browser.pages();
    for (let i=0; i<pages.length; i++) {
        if (pages[i].url().indexOf('instagram.com') !== -1) {
            page = pages[i];
            console.log(`found page ${page.url()}`);
            break;
        }
    }
    if (typeof page === undefined) {
        page = await browser.newPage();
        await page.goto(config.url1, {waitUntil: 'networkidle2'});
    };
    
    const blockElements = await page.$('._aae-');
    const elements = await blockElements.$$('._ab8w');
    
    console.log(`elements: ${elements.length}`);
    for(let i=0; i<elements.length; i++) {
        //elements[i].waitForSelector();
        elements[i].hover();
        const acOverview = page.$('._a3gq');
        if (acOverview !== null) {
            await acOverview.screenshot({path: `${i}.png`});
        }
        // await new Promise(r => setTimeout(r, 1000));
        // await blockElements.evaluate(() => {
        //     window.scrollBy(0, 30);
        // });
        console.log(`${i}`);
    }
};

// (function(){
//     startBr(config);
//     console.log('startBr after');
    
//     let id = setInterval(()=>{
//         if (url.ready) {
//             console.log(`we have url ${url.url}`);
//             console.log('start')
//             clearInterval(id);
//             doApp(config, ws.ws);
//         }
//     },1000);

// })();

doApp(config, 'ws://127.0.0.1:9222/devtools/browser/eca39a74-4e8b-41c4-9cda-d34c0401172d');