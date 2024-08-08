import { ConnectionAndMeta } from './GameManager';
import { Game } from './Game';
import { WILD, RED, GREEN, BLUE, YELLOW } from './Cards';

const valueSorted = [WILD.Wild, WILD.Draw4, RED._Draw2, RED._Skip, RED._Reverse, RED._9, RED._8, RED._7, RED._6, RED._5, RED._4, RED._3, RED._2, RED._1, RED._0];

enum USER {
  _1 = 0,
  _2,
  _3,
  _4
}

function getPlayableCard(cardHand: number[] | undefined, topCard: number) {
  if (typeof cardHand === 'undefined') {
    return 0;
  }

  let playableCards = [];

  for (let i = 0; i < cardHand.length; i++) {
    if ()
  }

  return 0;
}

export default function processMove(player: ConnectionAndMeta, game: Game, data: Uint8Array) {
  const getUserMoveAndSendIt = (userSeat: number) => {
    let move = getPlayableCard(game.getPlayerHand(userSeat), game.topCard);
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