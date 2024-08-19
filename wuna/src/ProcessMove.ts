import { ConnectionAndMeta } from './GameManager';
import { isWildCard, isReverseCard, isCardPlayable, isCardSameColor, isSkipCard, WILD, RED, GREEN, BLUE, YELLOW } from './Cards';
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

function getPlayableCard(cardHand: number[] | undefined, topCard: number, colorToPlay: number) {
  if (typeof cardHand === 'undefined') {
    return 0;
  }

  let playableCards: number[] = [];
  let wildCards: number[] = [];

  for (let i = 0; i < cardHand.length; i++) {
    const handCard = cardHand[i];
    if (isWildCard(handCard)) {
      wildCards.push(handCard);
    } else if (colorToPlay != -1 && isCardSameColor(handCard, colorToPlay)) {
      playableCards.push(handCard)
    } else if (isCardPlayable(handCard, topCard)) {
      playableCards.push(handCard);
    }
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
  let isNextSkip = true;
  let colorToPlay: number = -1;
  let getUserMoveAndSendIt: (userSeat: number) => void;

  getUserMoveAndSendIt =
    (userSeat: number) => {
      setTimeout(() => {

        // drawing cards and/or skiping move
        //
        let howMuchToDraw: typeof DRAW2 | typeof DRAW4 | typeof DRAW1 = DRAW1;
        if ((DRAW1 != (howMuchToDraw = getDrawCardNumber(game.topCard)) ||
          isSkipCard(game.topCard))
          && isNextSkip) {

          if (howMuchToDraw > DRAW1)
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
          isNextSkip = false;
          if (nextPlayer == 0)
            return;
          return getUserMoveAndSendIt(nextPlayer);
        }
        // normal flow
        //
        let move = getPlayableCard(game.getPlayerHand(userSeat), game.topCard, colorToPlay);
        if (move == 0) {
          let lastDrawedCard = game.drawUserCard(userSeat, DRAW1);
          move = getPlayableCard([lastDrawedCard], game.topCard, colorToPlay);
        }
        // we consumed colorToPlay global we need to reset it back to -1
        colorToPlay = -1;
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
            colorToPlay = game.UserColorBuckets.getChooseColorToPlayForUser(userSeat);
            arrayToSend[2] = colorToPlay;
            isNextSkip = true;
          }
          if (isSkipCard(move!)) {
            isNextSkip = true;
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
      }, 1000);
    };

  // entry point recursion
  //
  if (game.leftDirection) {
    getUserMoveAndSendIt(USER._2);
  } else {
    getUserMoveAndSendIt(USER._4);
  }
}