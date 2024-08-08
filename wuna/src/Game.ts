

import { NUMBER_OF_COLOR_CARDS, NUMBER_OF_BLACK_CARDS, NUBMER_OF_CARDS, NUBMER_OF_DECKS, RED, GREEN, BLUE, YELLOW, UNIVERSAL, WILD } from './Cards';

function shuffleArray(arrayToShuffle: number[]) {
  for (let i = arrayToShuffle.length - 1; i > 0; --i) {
    let index = Math.floor(Math.random() * i);
    if (index != i) {
      let temp = arrayToShuffle[i];
      arrayToShuffle[i] = arrayToShuffle[index];
      arrayToShuffle[index] = temp;
    }
  }
}

function initCardArray() {
  let retArray = new Array(NUBMER_OF_CARDS * NUBMER_OF_DECKS);
  for (let i = 0; i < NUMBER_OF_COLOR_CARDS; ++i) {
    retArray[i]
      = retArray[i + (NUBMER_OF_CARDS)]
      = retArray[i + (NUBMER_OF_CARDS * 2)]
      = retArray[i + (NUBMER_OF_CARDS * 3)]
      = RED._0 + i;
    let j = i + NUMBER_OF_COLOR_CARDS;
    retArray[j]
      = retArray[j + (NUBMER_OF_CARDS)]
      = retArray[j + (NUBMER_OF_CARDS * 2)]
      = retArray[j + (NUBMER_OF_CARDS * 3)]
      = GREEN._0 + i;
    let k = j + NUMBER_OF_COLOR_CARDS;
    retArray[k]
      = retArray[k + (NUBMER_OF_CARDS)]
      = retArray[k + (NUBMER_OF_CARDS * 2)]
      = retArray[k + (NUBMER_OF_CARDS * 3)]
      = BLUE._0 + i;
    let l = k + NUMBER_OF_COLOR_CARDS;
    retArray[l]
      = retArray[l + (NUBMER_OF_CARDS)]
      = retArray[l + (NUBMER_OF_CARDS * 2)]
      = retArray[l + (NUBMER_OF_CARDS * 3)]
      = YELLOW._0 + i;
    if (i < 2) {
      let m = l + NUMBER_OF_COLOR_CARDS;
      retArray[m]
        = retArray[m + (NUBMER_OF_CARDS)]
        = retArray[m + (NUBMER_OF_CARDS * 2)]
        = retArray[m + (NUBMER_OF_CARDS * 3)]
        = UNIVERSAL.Draw4 + i;
    }
  }
  shuffleArray(retArray);
  return retArray;
}

import { isReverseCard } from '../cli/svg/svg_getcard.tsx';



const compare = (A_card: number, B_card: number) => {
  if (A_card == B_card)
    return 0;
  if (A_card == WILD.Wild)
    return 1;
  else if (B_card == WILD.Wild)
    return -1;
  if (A_card == WILD.Draw4 && B_card != WILD.Wild)
    return 1;
  if (A_card != WILD.Draw4 && B_card == WILD.Wild)
    return -1;

};

export class Game {
  constructor() {
    this.CardArray = initCardArray();
  }

  private removeCard(idOfCard: number, userSeat: number) {
    const removeFromCardArray = (cardArray: number[], idOfCard: number, userTag: string) => {
      const index = cardArray.indexOf(idOfCard);
      if (index == -1) {
        console.log('requested remove card=', idOfCard, ` from ${userTag} user!`);
        return;
      }
      cardArray.splice(index, 1);
    };
    if (userSeat == 0) {
      removeFromCardArray(this.A_UserCards, idOfCard, 'A');
    }
    if (userSeat == 1) {
      removeFromCardArray(this.B_UserCards, idOfCard, 'B');
    }
    if (userSeat == 2) {
      removeFromCardArray(this.C_UserCards, idOfCard, 'C');
    }
    if (userSeat == 3) {
      removeFromCardArray(this.D_UserCards, idOfCard, 'D');
    }
  }

  removeCardUserAndSetItTopCard(idOfCard: number, userSeat: number) {
    this.removeCard(idOfCard, userSeat);
    this.topCard = idOfCard;
    if (isReverseCard(idOfCard)) {
      this.leftDirection = !this.leftDirection;
    }
  }

  getNextCard() {
    return this.CardArray.pop();
  }

  getRemaniedCardsCount() {
    return this.CardArray.length;
  }

  getPlayerHand(userSeat: number) {
    if (userSeat == 0) {
      return this.A_UserCards;
    }
    if (userSeat == 1) {
      return this.B_UserCards;
    }
    if (userSeat == 2) {
      return this.C_UserCards;
    }
    if (userSeat == 3) {
      return this.D_UserCards;
    }
  }

  getAllPlayerStartingHands() {
    //
  }

  topCard: number = -1;
  leftDirection: boolean = true;
  A_UserCards: number[] = [];
  B_UserCards: number[] = [];
  C_UserCards: number[] = [];
  D_UserCards: number[] = [];

  CardArray: number[] = [];
}

enum USER {
  _1 = 0,
  _2,
  _3,
  _4
};

enum COL {
  RED = 0,
  GREEN,
  BLUE,
  YELLOW
}

class ColorBucketTotalValues {

  private toSeatNumber(userSeat: number, callback: (inputArray: number[]) => {}) {
    if (userSeat == USER._1) {
      callback(this.A_colorBucks);
    }
    if (userSeat == USER._2) {
      callback(this.B_colorBucks);
    }
    if (userSeat == USER._3) {
      callback(this.C_colorBucks);
    }
    if (userSeat == USER._4) {
      callback(this.D_colorBucks);
    }
  }

  addCard(userSeat: number, cards: number[]) {
    const addCard = (arrayToChange: number[]) => {

    };
    this.toSeatNumber(userSeat, addCard);
  }
  removeCard(userSeat: number, idOfCard: number) {

  }



  A_colorBucks: number[] = [0, 0, 0, 0];
  B_colorBucks: number[] = [0, 0, 0, 0];
  C_colorBucks: number[] = [0, 0, 0, 0];
  D_colorBucks: number[] = [0, 0, 0, 0];
}