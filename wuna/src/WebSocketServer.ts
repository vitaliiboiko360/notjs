import https from 'node:https';
import fs from 'node:fs';
import WebSocket, { WebSocketServer } from 'ws';

const PORT = 8008;

const server = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  ca: fs.readFileSync('./cert.pem'),
  rejectUnauthorized: false
}).listen(PORT);

const wss = new WebSocketServer({
  noServer: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
});

console.log('from ws server');

function getRandomNumber(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function onConnection(ws: WebSocket) {
  console.log('on connection');

  ws.on('error', (error) => {
    console.log(`our error= ${error}`);
  });

  ws.on('message', function message(data, isBinary) {
    if (isBinary) {
      let array = new Uint8Array(data as Uint8Array);
      console.log(`we recive binary = `);
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
      }
    }
    else {
      console.log(`non binary = ${JSON.stringify(data)}`);
    }
    // wss.clients.forEach(
    //   function each(client) {
    //     if (client !== ws && client.readyState === WebSocket.OPEN) {
    //       client.send(data, { binary: isBinary });
    //     }
    //   });
  });

  setInterval(() => {
    let arrayToSend = new Uint8Array(10);
    arrayToSend[0] = getRandomNumber(0, 100);
    arrayToSend[1] = getRandomNumber(0, 100);
    ws.send(arrayToSend, { binary: true });
  }, 10000);
}

wss.on('connection', onConnection);

server.on('upgrade', (request, socket, head) => {
  console.log('on upgrade');

  const afterDoneUpgrade = (ws: WebSocket) => {
    wss.emit('connection', ws, request);
  }

  wss.handleUpgrade(request, socket, head, afterDoneUpgrade);
});