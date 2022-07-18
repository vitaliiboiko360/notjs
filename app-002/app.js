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
            doApp(config, url.url);
        };
    });
}

async function doApp(config, ws) {
    console.log(`doApp started with ${ws}`);
    const browser = await puppeteer.connect({browserWSEndpoint:ws, defaultViewport: {deviceScaleFactor:2, width:920, height:1292}});

    var page;
    const pages = await browser.pages();
    for (let i=0; i<pages.length; i++) {
        if (pages[i].url().indexOf(config.url1) !== -1) {
            page = pages[i];
            console.log(`found page ${page.url()}`);
            break;
        }
    }
    if (page == null) {
        console.log('no page found');
        page = await browser.newPage();
        await page.goto(config.url1, {waitUntil: 'networkidle2'});
    }
    var lastSaved;
    var picIndex = 0;
    
    const blockElements = await page.$('._aae-');
    while(true) {
    var startIndex = 0;
    const elements = await blockElements.$$('li');
    
    console.log(`elements: ${elements.length}`);
    
    console.log(`saved is ${lastSaved}`);
    if(lastSaved != null) {
        for(let i=0; i<elements.length; i++) {
            let element = elements[i];
            const links = await element.$$('a');
            const link = links[links.length - 1];
            const idName = await link.evaluate(a => a.innerText);
            if(idName === lastSaved) {
                startIndex = i+1;
                console.log(`${idName} is equal to ${lastSaved} and startIndex=${startIndex}`);
                break;
            }
        }
    }
    console.log(`startIndex ${startIndex}`);
    for(let i=startIndex; i< elements.length; i++) {
        //const avatarHolder = await elements[i].$('._aarf');
        let element = elements[i];
        const links = await element.$$('a');
        const link = links[links.length - 1];
        
        const id = await link.evaluate(a => a.innerText);
        console.log(id);
        const names = await element.$$('._aacl');
        if(names.length > 1) {
            console.log(await names[names.length-2].evaluate(n => n.innerText));
        }

        link.hover().catch(() => {
        });

        var saved = false;
        var hoverFailed = 0;
        while(!saved) {
            try {
                await page.waitForTimeout(1000);
                let miniWindow = await page.$('div._aap3._aap4');
                await miniWindow.screenshot({fromsurface:true, path: `./${picIndex++}.png`});
                saved = true;
                lastSaved = id;
            } catch {
                console.log(`hovering again`);
                link.hover().catch(() => {
                    hoverFailed++;
                });
                if(hoverFailed > 4) {
                    break;
                }
                await page.waitForTimeout(1000);
            }
        }
        
        await page.mouse.move(-80, -80);
        
        // await new Promise(r => setTimeout(r, 1000));
        // await blockElements.evaluate(() => {
        //     window.scrollBy(0, 30);
        // });
        console.log(`${picIndex}`);
    }
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
//startBr(config);
doApp(config, config.wsUrl);