
const puppeteer = require('puppeteer-core');

const config = {browserWSEndpoint:ws, defaultViewport: {deviceScaleFactor:2, width:920, height:1292}};
const browser = await puppeteer.launch(config);
const page = await browser.newPage();

await page.setViewport({
    width,
    height,
});

console.log('⬇️ Fetching ' + pageURL);
    await Promise.race([
    responsePromise,
    page.goto(pageURL, {
        waitUntil: 'networkidle2',
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
    10 * 1000,
    'Render timed out',
  );

console.log(content);

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