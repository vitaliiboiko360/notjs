const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
// const spawn = util.promisify(require('node:child_process').spawn);
const spawn = require('node:child_process').spawn;
const spawnSync = require('node:child_process').spawnSync;
var stream = require('stream');

const json = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(json);

var outputFile = fs.createWriteStream('./out/output.json');
outputFile.write('{data:[\n');

var writeToFile = function(idName,name,numPosts) {
    outputFile.write(`["${idName}","${name}",${numPosts}],\n`)
}

var endFile = function(count) {
    outputFile.write(`\ncount:${count}}`);
}

var url = {
    ready: false,
    url: ''    
};
function main(config) {
    let runFilePath = './run';
    if (fs.existsSync(runFilePath)) {
        let wsUrl = fs.readFileSync(runFilePath);
        console.log(`trying to connect to ${wsUrl}`);
        doApp(config, wsUrl);
        return;
    }

    let cmd = `"${config.execPath}" ${config.cmdArgs.join(' ')}`;
    console.log(`running ${cmd}`);
    const child = spawn(config.execPath, config.cmdArgs, {
        detached: true,
        stdio: ['ignore', 'ignore', 'pipe']
    });
    child.unref();
    const re = new RegExp('ws:[^ ]*');
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
    
    const blockElements = await page.waitForSelector('._aae-');
    while(true) {
    var startIndex = 0;
    const elements = await blockElements.$$('li');
    
    console.log(`elements: ${elements.length}`);
    
    console.log(`saved is ${lastSaved}`);
    if(lastSaved != null) {
        for(let i=0; i<elements.length; i++) {
            const links = await elements[i].$$('a');
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
        let element = elements[i];
        const links = await element.$$('a');
        const link = links[links.length - 1];
        
        const id = await link.evaluate(a => a.innerText);
        console.log(id);
        const imgHolder = await element.$('canvas');
        imgHolder.hover().catch(() => {
        });
        var saved = false;
        var hoverFailed = 0;
        while(!saved) {
            try {         
                let miniWindow = await page.waitForSelector('div._aap3._aap4');
                let name = await miniWindow.$eval('._aap2', n => n.innerText).catch(e => {}) || "";
                let numPosts = await miniWindow.$eval('._ac2a',n => n.innerText);
                numPosts = numPosts.replaceAll(',','');
                console.log(`${name} : ${numPosts}`);
                await miniWindow.$$('._aazw')
                .then(async (divs)=>{
                    let isPrivate = await divs[divs.length-1].evaluate(n => n.innerText) || "";
                    if (isPrivate.indexOf('Private') != -1) {
                        await divs[0].$('img')
                        .then(async (img)=>{
                            let imgSrc = await img.evaluate(i => i.getAttribute('src'));
                            const file = fs.createWriteStream(`./out/${id}.jpg`);
                            http.get(imgSrc, (response)=>{
                                response.pipe(file);
                                file.on("finish", () => {
                                    file.close();
                                });
                            });
                        });
                    } else {
                        await miniWindow.screenshot({fromsurface:true, path: `./out/${id}.png`});
                    }
                })
                .catch(e => {});   
                saved = true;
                lastSaved = id;
                await page.waitForTimeout(1000);
                writeToFile(id, name, numPosts);
            } catch {
                console.log(`hovering again`);
                imgHolder.hover().catch(() => {
                    hoverFailed++;
                });
                if(hoverFailed > 4) {
                    break;
                }               
            }
        }
        
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);
    
        console.log(`${picIndex++}`);
    }
}
};

main(config);