import WebSocket from 'ws';


function getRandomNumber(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

enum NUBMER_OF_CARDS {
  COLOR = 54,
  BLACK = 2,
  ALL = 56
}

enum COLOR_OFFSET {
  YELLOW = 80,
  BLUE = 60,
  GREEN = 40,
  RED = 20,
  BLACK = 10,
}

enum COLOR_NUMBERS {
  BLACK = 2,
  RED = 15,
  GREEN = 28,
  BLUE = 41,
  YELLOW = 54
}

let index = -1;
function getConsequtiveCardId() {
  index++;
  if (index < COLOR_NUMBERS.BLACK)
    return index + COLOR_OFFSET.BLACK;
  else if (index < COLOR_NUMBERS.RED)
    return (index - COLOR_NUMBERS.BLACK) + COLOR_OFFSET.RED;
  else if (index < COLOR_NUMBERS.GREEN)
    return (index - COLOR_NUMBERS.RED) + COLOR_OFFSET.GREEN;
  else if (index < COLOR_NUMBERS.BLUE)
    return (index - COLOR_NUMBERS.GREEN) + COLOR_OFFSET.BLUE;
  else if (index < COLOR_NUMBERS.YELLOW)
    return (index - COLOR_NUMBERS.BLUE) + COLOR_OFFSET.YELLOW;
  else {
    index = index % NUBMER_OF_CARDS.ALL;
    return getConsequtiveCardId();
  }
}

export function getRandomCardId() {
  let index = Math.floor(Math.random() * 54);
  if (index < COLOR_NUMBERS.BLACK)
    return index + COLOR_OFFSET.BLACK;
  else if (index < COLOR_NUMBERS.RED)
    return (index - COLOR_NUMBERS.BLACK) + COLOR_OFFSET.RED;
  else if (index < COLOR_NUMBERS.GREEN)
    return (index - COLOR_NUMBERS.RED) + COLOR_OFFSET.GREEN;
  else if (index < COLOR_NUMBERS.BLUE)
    return (index - COLOR_NUMBERS.GREEN) + COLOR_OFFSET.BLUE;
  else if (index < COLOR_NUMBERS.YELLOW)
    return (index - COLOR_NUMBERS.BLUE) + COLOR_OFFSET.YELLOW;
  else {
    return getRandomCardId();
  }
}

import { AppWebSocketInterface, wsArray } from './PlayerWsConnection';
import { connect } from 'react-redux';

export declare interface ConnectionAndMeta extends AppWebSocketInterface {
  seatNumber: number
}

let playerConnectionsIds = new Set<number>();
let playerConnections = new Map<number, ConnectionAndMeta>();

function processSeatRequest(data: Uint8Array, webSocket: AppWebSocketInterface) {
  const id = webSocket.id;
  if (id in playerConnectionsIds) {
    console.log('the player with webSocket id=', id, ' trying to connect more than one time!');
    return;
  }

  let player = webSocket as ConnectionAndMeta;
  player.seatNumber = data[0];
  playerConnections.set(id, player);
  playerConnectionsIds.add(id);

  player.send([data[0]], { binary: true });
}

function processPlayerInputConnection(data: Uint8Array, id: number) {
  let firstByte = data[0];
  let player = playerConnections.get(id);
}

export function dispatchClientMessage(data: Uint8Array, webSocket: AppWebSocketInterface) {
  const id = webSocket.id;
  console.log(`CLIENT = `, id, ' message: ', data.join(' '));

  let firstByte = data[0];
  // check if firstByte == 1,2,3 or 4
  if (firstByte >= 1 && firstByte <= 4) {
    return processSeatRequest(data, webSocket);
  }

  if (id in playerConnectionsIds) {
    return processPlayerInputConnection(data, id);
  }

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
}

export function serveGame() {
  while (true) {
    for (let i = 0; i < wsArray.length; ++i) {
      let webSocket = wsArray[i];
      let arrayToSend = new Uint8Array(10);
      arrayToSend[0] = getRandomCardId();
      arrayToSend[1] = getRandomCardId();
      if (webSocket.readyState === WebSocket.OPEN) {
        console.log(`we are sending `, arrayToSend.join(' '), ' to clientId=', webSocket.id);
        webSocket.send(arrayToSend, { binary: true });
      }
    }
  }
}