import https from 'node:https';
import fs from 'node:fs';
import WebSocket, { WebSocketServer } from 'ws';

import registerPlayerConnection from './PlayerWsConnection';

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

function onConnection(ws: WebSocket) {
  registerPlayerConnection(ws);
}

wss.on('connection', onConnection);

let counter1 = 0;
const intervalCheckingClients = setInterval(() => {
  console.log('wss.clients=', wss.clients.size);
  // counter1++;
  // if (counter1 > 10) {
  //   clearInterval(intervalCheckingClients);
  // }
}, 10000);

server.on('upgrade', (request, socket, head) => {
  console.log('on upgrade');

  const afterDoneUpgrade = (ws: WebSocket) => {
    wss.emit('connection', ws, request);
  }

  wss.handleUpgrade(request, socket, head, afterDoneUpgrade);
});