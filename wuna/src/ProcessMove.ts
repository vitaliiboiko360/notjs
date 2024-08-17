import { ConnectionAndMeta } from './GameManager';
import { WILD, RED, GREEN, BLUE, YELLOW, isReverseCard } from './Cards';
import { Game, DRAW2, DRAW4 } from './Game';

const valueSorted = [WILD.Wild, WILD.Draw4, RED._Draw2, RED._Skip, RED._Reverse, RED._9, RED._8, RED._7, RED._6, RED._5, RED._4, RED._3, RED._2, RED._1, RED._0];

export function isSkipOrDrawCard(idOfCard: number) {
  if (idOfCard == RED._Draw2 ||
    idOfCard == RED._Skip ||
    idOfCard == GREEN._Draw2 ||
    idOfCard == GREEN._Skip ||
    idOfCard == BLUE._Draw2 ||
    idOfCard == BLUE._Skip ||
    idOfCard == YELLOW._Draw2 ||
    idOfCard == YELLOW._Skip ||
    idOfCard == WILD.Draw4
  ) {
    return true;
  }
  return false;
}

export function isSkipCard(idOfCard: number) {
  if (idOfCard == RED._Skip ||
    idOfCard == GREEN._Skip ||
    idOfCard == BLUE._Skip ||
    idOfCard == YELLOW._Skip
  ) {
    return true;
  }
  return false;
}

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
  return 0;
}

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
  }

  return 0;
}

export default function processMove(player: ConnectionAndMeta, game: Game, data: Uint8Array) {


  let getUserMoveAndSendIt: (userSeat: number) => void;
  getUserMoveAndSendIt =
    (userSeat: number) => {
      let howMuchToDraw = 0;
      if (isSkipOrDrawCard(game.topCard)) {
        howMuchToDraw = getDrawCardNumber(game.topCard);

      }


      // normal flow
      //
      let move = getPlayableCard(game.getPlayerHand(userSeat), game.topCard);
      let arrayToSend: Uint8Array = new Uint8Array(2);
      arrayToSend[0] = userSeat;
      arrayToSend[1] = move;
      player.send(arrayToSend);

      game.removeCardUserAndSetItTopCard(move, userSeat);
      if (isReverseCard(move)) {
        game.leftDirection = !game.leftDirection;
      }

      if (userSeat == USER._2) {
        if (game.leftDirection) {
          getUserMoveAndSendIt(USER._3);
        } else if (!isSkipOrDrawCard) {
          return;
        }
      }
      if (userSeat == USER._3) {
        if (game.leftDirection) {
          getUserMoveAndSendIt(USER._4)
        }
      }
      if (userSeat == USER._4) {
        if (game.leftDirection) {
          return;
        } else {
          getUserMoveAndSendIt(USER._3);
        }
      }
    }

  // etnty point recursion 
  //
  if (game.leftDirection) {
    getUserMoveAndSendIt(USER._2);
  } else {
    getUserMoveAndSendIt(USER._4);
  }
}