import WebSocket from 'ws';

let webSocketId: number = 0;

declare interface AppWebSocketInterface extends WebSocket {
  id: number,
  isInitialized: boolean
}

export let wsArray: AppWebSocketInterface[] = [];

let isAllInitialized = false;

import { dispatchClientMessage } from './GameManager';

function initializeWebSocket(webSocket: AppWebSocketInterface) {
  webSocket.isInitialized = true;
  webSocket.on('error', (error) => {
    console.log(`our error= ${error}`);
  });

  webSocket.on('message', function message(data, isBinary) {
    if (isBinary) {
      dispatchClientMessage(data as Uint8Array, webSocket.id);
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

  //console.log('initalize socketId=', webSocket.id);
}

function setupInitializingLoop() {
  setInterval(() => {
    if (isAllInitialized)
      return;

    let unInitializedWebSockets = wsArray
      .filter(webSocket => webSocket.isInitialized == false
        || webSocket.isInitialized == undefined);
    if (unInitializedWebSockets.length > 0) {
      // console.log('un init websocket ids =', unInitializedWebSockets.map(ws => ws.id).join(' '));
      for (let i = 0; i < unInitializedWebSockets.length; ++i) {
        initializeWebSocket(unInitializedWebSockets[i]);
      }
      isAllInitialized = true;
    }

  }, 2000);
}

export default function registerPlayerConnection(ws: WebSocket) {
  let webSocket: AppWebSocketInterface = (ws) as AppWebSocketInterface;
  webSocket.id = webSocketId++;
  wsArray.push(webSocket);
  // console.log('accepted on connection id=', webSocket.id);
  isAllInitialized = false;
}

setupInitializingLoop();
