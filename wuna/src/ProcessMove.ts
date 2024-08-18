import { ConnectionAndMeta } from './GameManager';
import { isWildCard, isReverseCard, isSkipOrDrawCard, isSkipCard, WILD, RED, GREEN, BLUE, YELLOW } from './Cards';
import { compare, Game, DRAW1, DRAW2, DRAW4 } from './Game';

const valueSorted = [WILD.Wild, WILD.Draw4, RED._Draw2, RED._Skip, RED._Reverse, RED._9, RED._8, RED._7, RED._6, RED._5, RED._4, RED._3, RED._2, RED._1, RED._0];

export function getDrawCardNumber(idOfCard: number) {
  if (idOfCard == RED._Draw2 ||
    idOfCard == GREEN._Draw2 ||
    idOfCard == BLUE._Draw2 ||
    idOfCard == YELLOW._Draw2
  ) {
    return DRAW2;
  }
  if (idOfCard == WILD.Draw4) {
    return DRAW4;
  }
  return DRAW1;
}

enum USER {
  _1 = 0,
  _2,
  _3,
  _4
}

enum COLOR_BUCKET_INDEX {
  RED = 0,
  GREEN,
  BLUE,
  YELLOW
}

const USERS = 4;
const COLORS = 4;

import { isCardPlayable } from '../cli/svg/svg_getcard';

function getPlayableCard(cardHand: number[] | undefined, topCard: number) {
  if (typeof cardHand === 'undefined') {
    return 0;
  }

  let playableCards: number[] = [];
  let wildCards: number[] = [];

  for (let i = 0; i < cardHand.length; i++) {
    const handCard = cardHand[i];
    if (isWildCard(handCard)) {
      wildCards.push(handCard);
    } else if (isCardPlayable(handCard, topCard))
      playableCards.push(handCard);
  }

  if (playableCards.length != 0) {
    playableCards.sort(compare);
    return playableCards[0];
  }
  if (playableCards.length == 0 && wildCards.length > 0) {
    // we need to set color which is favoriable for us or random
    return wildCards.find(el => el == WILD.Draw4) || wildCards.find(el => el == WILD.Wild);
  }

  return 0;
}

export default function processMove(player: ConnectionAndMeta, game: Game, data: Uint8Array) {

  let getUserMoveAndSendIt: (userSeat: number) => void;

  getUserMoveAndSendIt =
    (userSeat: number) => {

      let howMuchToDraw: typeof DRAW2 | typeof DRAW4 | typeof DRAW1 = DRAW1;
      if (DRAW1 != (howMuchToDraw = getDrawCardNumber(game.topCard))) {
        game.drawUserCard(userSeat, howMuchToDraw);

        let nextPlayer: number;
        if (game.leftDirection) {
          nextPlayer = userSeat + 1 % USERS;
        } else {
          nextPlayer = (userSeat - 1) == 0 ? USERS - 1 : (userSeat - 1);
        }
        let arrayToSend: Uint8Array = new Uint8Array(2);
        arrayToSend[0] = userSeat;
        arrayToSend[1] = 0;
        player.send(arrayToSend);
        if (nextPlayer == 0)
          return;
        return getUserMoveAndSendIt(nextPlayer);
      }
      // normal flow
      //
      let move = getPlayableCard(game.getPlayerHand(userSeat), game.topCard);
      if (move == 0) {
        let lastDrawedCard = game.drawUserCard(userSeat, DRAW1);
        move = getPlayableCard([lastDrawedCard], game.topCard);
      }
      let arrayToSend: Uint8Array = new Uint8Array(3);
      arrayToSend[0] = userSeat;
      arrayToSend[1] = move!;
      player.send(arrayToSend);
      if (move != 0) {
        game.removeCardUserAndSetItTopCard(move!, userSeat);
        if (isReverseCard(move!)) {
          game.leftDirection = !game.leftDirection;
        }
        if (isWildCard(move!)) {
          let colorToPlay = game.UserColorBuckets.getChooseColorToPlayForUser(userSeat);
          arrayToSend[2] = colorToPlay;
        }
      }

      {
        let nextPlayer: number;
        if (game.leftDirection) {
          nextPlayer = userSeat + 1 % USERS;
        } else {
          nextPlayer = (userSeat - 1) == 0 ? USERS - 1 : (userSeat - 1);
        }
        if (nextPlayer == 0)
          return;
        return getUserMoveAndSendIt(nextPlayer);
      }
    }

  // entry point recursion
  //
  if (game.leftDirection) {
    getUserMoveAndSendIt(USER._2);
  } else {
    getUserMoveAndSendIt(USER._4);
  }
}