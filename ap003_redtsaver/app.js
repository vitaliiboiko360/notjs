import puppeteer from 'puppeteer-core';
import fs from 'fs';
import spawn from 'node:child_process';

import pTimeout from 'p-timeout';

async function doApp(appConfig, wsUrl)
{
  const width = 920;
  const height = 1292;
  const pageURL = appConfig.url;
  const config = {browserWSEndpoint:wsUrl, defaultViewport: {deviceScaleFactor:2, width:920, height:1292}};
  const browser = await puppeteer.connect(config);
  const page = await browser.newPage();

  await page.setViewport({
      width,
      height,
  });

  let responseReject;
  const responsePromise = new Promise((_, reject) => {
    responseReject = reject;
  });

  page.on('response', ({ headers }) => {
    const location = headers['location'];
    if (location && location.includes(host)) {
      responseReject(new Error('Possible infinite redirects detected.'));
    }
  });

  console.log('⬇️ Fetching ' + pageURL);
      await Promise.race([
      responsePromise,
      page.goto(pageURL, {
          waitUntil: 'domcontentloaded',
      }),
  ]);

  page.frames().forEach((frame) => {
      frame.evaluate(() => {
        document.querySelectorAll('video, audio').forEach((m) => {
          if (!m) return;
          if (m.pause) m.pause();
          m.preload = 'none';
        });
      });
    });

  const content = await pTimeout(
      page.evaluate(() => {
            let content = '';
            if (document.doctype) {
              content = new XMLSerializer().serializeToString(
                document.doctype,
              );
            }

            const doc = document.documentElement.cloneNode(true);

            // Remove scripts except JSON-LD
            const scripts = doc.querySelectorAll(
              'script:not([type="application/ld+json"])',
            );
            scripts.forEach((s) => s.parentNode.removeChild(s));

            // Remove import tags
            const imports = doc.querySelectorAll('link[rel=import]');
            imports.forEach((i) => i.parentNode.removeChild(i));

            const { origin, pathname } = location;
            // Inject <base> for loading relative resources
            if (!doc.querySelector('base')) {
              const base = document.createElement('base');
              base.href = origin + pathname;
              doc.querySelector('head').appendChild(base);
            }

            // Try to fix absolute paths
            const absEls = doc.querySelectorAll(
              'link[href^="/"], script[src^="/"], img[src^="/"]',
            );
            absEls.forEach((el) => {
              const href = el.getAttribute('href');
              const src = el.getAttribute('src');
              if (src && /^\/[^/]/i.test(src)) {
                el.src = origin + src;
              } else if (href && /^\/[^/]/i.test(href)) {
                el.href = origin + href;
              }
            });

            content += doc.outerHTML;

            // Remove comments
            content = content.replace(/<!--[\s\S]*?-->/g, '');

            return content;
          }),
          { 
            milliseconds:10000,
            message:'Render timed out'
          }
    );
  console.log(content);
}
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const appConfig = require('./config.json');

function main(appConfig) {
    let runFilePath = './run';
    if (fs.existsSync(runFilePath)) {
        let wsUrl = fs.readFileSync(runFilePath);
        console.log(`trying to connect to ${wsUrl}`);   
        doApp(appConfig, wsUrl);
        return;
    }

    let cmd = `"${appConfig.execPath}" ${appConfig.cmdArgs.join(' ')}`;
    console.log(`running ${cmd}`);
    const child = spawn(appConfig.execPath, appConfig.cmdArgs, {
        detached: true,
        stdio: ['ignore', 'ignore', 'pipe']
    });
    
    const re = new RegExp('ws:[^ ]*');
    child.stderr.on('data', (data)=>{
        console.log('getting wsUrl');
        let match = re.exec(data.toString());
        if(match) {
            wsUrl = match[0];
            console.log(`found wsUrl=${wsUrl}`);
            fs.writeFileSync(runFilePath, wsUrl);
            doApp(appConfig, wsUrl);
        };
    });
    child.unref();
}

main(appConfig);