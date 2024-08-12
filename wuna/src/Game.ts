

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

import { getColor } from './Cards';

const compare = (A_card: number, B_card: number) => {
  const A_color: number = getColor(A_card);
  const B_color: number = getColor(B_card);
  if (A_color > B_color)
    return 1;
  if (A_color < B_color)
    return -1;
  if (A_color == B_color) {
    if (A_color != COL.BLACK) {
      if (A_card > B_card)
        return -1;
      if (A_card < B_card)
        return 1;
      if (A_card == B_card)
        return 0;
    } else {
      if (A_card > B_card)
        return 1;
      if (A_card < B_card)
        return -1;
      if (A_card == B_card)
        return 0;
    }
  }
  return 0;
};

const numberStartHandCards = 7;
const numberTotalPlayers = 4;

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

  getRemainedCardsCount() {
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


  // call it only at the beginning of the game, when CardArray is full
  getAllPlayerStartingHands() {
    const firstHandsCards = numberTotalPlayers * numberStartHandCards;
    const l = this.CardArray.length - firstHandsCards;
    const cardArray = this.CardArray.splice(l);
    for (let i = 0; i < numberStartHandCards; i += 4) {
      this.A_UserCards.push(cardArray[i]);
      this.B_UserCards.push(cardArray[i + 1]);
      this.C_UserCards.push(cardArray[i + 2]);
      this.D_UserCards.push(cardArray[i + 3]);
    }
    this.A_UserCards.sort(compare);
    this.B_UserCards.sort(compare);
    this.C_UserCards.sort(compare);
    this.D_UserCards.sort(compare);

    // might be in an another method
    this.topCard = this.CardArray.pop() || 0;
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
  BLACK = 0,
  RED,
  GREEN,
  BLUE,
  YELLOW
}

class ColorBucketTotalValues {

  private toSeatNumber(userSeat: number, callback: (inputArray: number[]) => void) {
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
      for (let i = 0; i < cards.length; ++i) {

      }
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