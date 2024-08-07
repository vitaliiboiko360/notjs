import { ConnectionAndMeta } from './GameManager';
import { Game } from './Game';

enum USER {
  _1 = 0,
  _2,
  _3,
  _4
}

function getPlayableCard(cardHand: number[] | undefined) {
  if (typeof cardHand === 'undefined') {
    return 0;
  }

  return 0;
}

export default function processMove(player: ConnectionAndMeta, game: Game, data: Uint8Array) {
  const getUserMoveAndSendIt = (userSeat: number) => {
    let move = getPlayableCard(game.getPlayerHand(userSeat));
    let arrayToSend: Uint8Array = new Uint8Array(2);
    arrayToSend[0] = userSeat;
    arrayToSend[1] = move;
    player.send(arrayToSend);
  }

  if (game.leftDirection) {
    getUserMoveAndSendIt(USER._2);
  } else {
    getUserMoveAndSendIt(USER._3);
  }
}