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

wss.on('connection',
  function onConnection(ws) {
    console.log('on connection');

    ws.on('error', (error) => {
      console.log(`our error= ${error}`);
    });

    ws.on('message', function message(data, isBinary) {
      console.log(`data=${JSON.stringify(data)}`);
      // wss.clients.forEach(
      //   function each(client) {
      //     if (client !== ws && client.readyState === WebSocket.OPEN) {
      //       client.send(data, { binary: isBinary });
      //     }
      //   });
    });
  });

server.on('upgrade', (request, socket, head) => {
  console.log('on upgrade');
  wss.handleUpgrade(request, socket, head, function afterDoneUpgrade(ws) {
    wss.emit('connection', ws, request);
  });
});