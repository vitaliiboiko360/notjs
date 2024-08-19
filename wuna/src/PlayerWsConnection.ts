import WebSocket from 'ws';

let webSocketId: number = 0;

export declare interface AppWebSocketInterface extends WebSocket {
  id: number
}

export let wsArray: AppWebSocketInterface[] = [];

import { cleanupPlayerId, dispatchClientMessage } from './GameManager';

function initializeWebSocket(webSocket: AppWebSocketInterface) {
  webSocket.on('error', (error) => {
    console.log(`our error= ${error}`);
  });

  webSocket.on('close', () => {
    console.log('we\'re closing... ID=', webSocket.id);
    let index = wsArray.indexOf(webSocket);
    if (index != -1) {
      wsArray.splice(index, 1);
    }
    cleanupPlayerId(webSocket.id);
  });

  webSocket.on('message', function message(data, isBinary) {
    if (isBinary) {
      dispatchClientMessage(data as Uint8Array, webSocket);
    }
    else {
      console.log(`non binary = ${JSON.stringify(data)}`);
    }
  });
}

export default function registerPlayerConnection(ws: WebSocket) {
  let webSocket: AppWebSocketInterface = (ws) as AppWebSocketInterface;
  webSocket.id = webSocketId++;
  wsArray.push(webSocket);
  // console.log('accepted on connection id=', webSocket.id);
  initializeWebSocket(webSocket);
}
