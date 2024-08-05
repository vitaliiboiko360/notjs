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

export declare interface ConnectionAndMeta extends AppWebSocketInterface {
  seatNumber: number
}

const playerAllotedSeatsNumber = 4;
let playerAllotedSeats = new Set<number>();
let playerConnectionsIds = new Set<number>();
let playerConnections = new Map<number, ConnectionAndMeta>();

function processSeatRequest(data: Uint8Array, webSocket: AppWebSocketInterface) {
  const id = webSocket.id;
  if (id in playerConnectionsIds) {
    console.log('the player with webSocket id=', id, ' trying to connect more than one time!');
    return;
  }

  let seatNumberRequested = data[0] - 1; // on client seats are numbered starting from 1 to 4
  let allotedSeatNumber = seatNumberRequested;
  let player = webSocket as ConnectionAndMeta;
  for (let [id, playerConnection] of playerConnections) {
    if (playerConnection.seatNumber == seatNumberRequested) {
      let index = seatNumberRequested;
      while (++index % playerAllotedSeatsNumber != seatNumberRequested) {
        if (!playerAllotedSeats.has(index)) {
          allotedSeatNumber = index;
          break;
        }
      }
      if (index == seatNumberRequested) {
        console.log('someone requested seat that\'s already taken and there\'s no avaialable seats left');
        return;
      }
      break;
    }
  }
  player.seatNumber = allotedSeatNumber;
  playerConnections.set(id, player);
  playerConnectionsIds.add(id);
  playerAllotedSeats.add(player.seatNumber);
  let arrayToSend = new Uint8Array(1);
  arrayToSend[0] = player.seatNumber + 5;
  player.send(arrayToSend, { binary: true });  // client get the same number + 5 as confirmation to seat request
}

import { isValidCard } from './Cards';
import { game } from './WebSocketServer';

function processPlayerInputConnection(data: Uint8Array, id: number) {
  let firstByte = data[0];
  let secondByte = data[1];
  let player = playerConnections.get(id);

  if (firstByte != player!.seatNumber) {
    console.log('client with seatNumber=', player!.seatNumber, ' recive msg with firstByte=', firstByte);
    return;
  }

  if (isValidCard(secondByte)) {
    // remove card from game state for this ID connection player
    let seatNumber = player!.seatNumber;
    game.removeCardUserAndSetItTopCard(firstByte, seatNumber);
  }

  // player just moved a valid card
  // we need
  // to update top card by user's
  // in game's state
  const idOfCard = firstByte;
  for (let [playerConnectionId, playerConnection] of playerConnections) {
    if (playerConnectionId != id) {
      playerConnection.send([player!.seatNumber + 5, idOfCard], { binary: true });
    }
  }
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
}

function isTwoArrayEqual(arrayOne: Uint8Array, arrayTwo: Uint8Array) {
  for (let i = 0; i < arrayOne.length; ++i) {
    if (arrayOne[i] !== arrayTwo[i])
      return false;
  }
  return true;
}

export var previousArraySent: Uint8Array;

export async function serveGame() {
  setInterval(() => {

    let arrayToSend = new Uint8Array(6);
    arrayToSend[0] = 0;
    arrayToSend[1] = game.topCard;
    arrayToSend[2] = game.A_UserCards.length;
    arrayToSend[3] = game.B_UserCards.length;
    arrayToSend[4] = game.C_UserCards.length;
    arrayToSend[5] = game.D_UserCards.length;

    if (isTwoArrayEqual(arrayToSend, previousArraySent)) {
      return; // have sent it already
    }
    previousArraySent = arrayToSend;
    for (let i = 0; i < wsArray.length; ++i) {
      let webSocket = wsArray[i];
      if (webSocket.readyState === WebSocket.OPEN) {
        //console.log(`we are sending `, arrayToSend.join(' '), ' to clientId=', webSocket.id);
        webSocket.send(arrayToSend, { binary: true });
      }
    }
  }, 1000);
}