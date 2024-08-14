

import { NUMBER_OF_COLOR_CARDS, NUMBER_OF_BLACK_CARDS, NUBMER_OF_CARDS, NUBMER_OF_DECKS, RED, GREEN, BLUE, YELLOW, WILD, isValidStartCard } from './Cards';

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
        = WILD.Draw4 + i;
    }
  }
  shuffleArray(retArray);
  return retArray;
}

import { getColor, isReverseCard } from './Cards';

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

  startNewGame() {
    this.CardArray = initCardArray();
    this.topCard = -1;
    this.leftDirection = true;
    this.A_UserCards = [];
    this.B_UserCards = [];
    this.C_UserCards = [];
    this.D_UserCards = [];
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
  initAllPlayerStartingHands() {
    const firstHandsCards = numberTotalPlayers * numberStartHandCards;
    const l = this.CardArray.length - firstHandsCards;
    const cardArray = this.CardArray.splice(l);
    for (let i = 0; i < firstHandsCards; i += 4) {
      this.A_UserCards.push(cardArray[i]);
      this.B_UserCards.push(cardArray[i + 1]);
      this.C_UserCards.push(cardArray[i + 2]);
      this.D_UserCards.push(cardArray[i + 3]);
    }
    this.A_UserCards.sort(compare);
    this.B_UserCards.sort(compare);
    this.C_UserCards.sort(compare);
    this.D_UserCards.sort(compare);
  }

  initRandomProperStartTopCard() {
    let counter = 0;
    do {
      let index = Math.floor(Math.random() * (this.CardArray.length - 1));
      if (isValidStartCard(this.CardArray[index])) {
        this.topCard = this.CardArray.splice(index, 1)[0];
        break;
      }
      if (++counter > 100)
        break;
    }
    while (true);
  }

  topCard: number = -1;
  leftDirection: boolean = true;
  A_UserCards: number[] = [];
  B_UserCards: number[] = [];
  C_UserCards: number[] = [];
  D_UserCards: number[] = [];

  CardArray: number[] = [];

  public UserColorBuckets: ColorBucketTotalValues = new ColorBucketTotalValues();
}

enum USER {
  _1 = 0,
  _2,
  _3,
  _4
};

export const COLOR_BLACK = 0;
export const COLOR_RED = 1;
export const COLOR_GREEN = 2;
export const COLOR_BLUE = 3;
export const COLOR_YELLOW = 4;


// array corresponds to face value number cards and three special ones
// [0 .. 9, Reverse, Skip, Draw2]
export const CARD_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 20, 20];

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

  addCard(userSeat: number, idOfCard: number) {
    const addCard = (arrayToChange: number[]) => {
      const color = getColor(idOfCard);
      switch (color) {
        case COLOR_RED:
          arrayToChange[0] += CARD_VALUES[idOfCard - RED._0];
          break;
        case COLOR_GREEN:
          arrayToChange[1] += CARD_VALUES[idOfCard - GREEN._0];
          break;
        case COLOR_BLUE:
          arrayToChange[2] += CARD_VALUES[idOfCard - BLUE._0];
          break;
        case COLOR_YELLOW:
          arrayToChange[3] += CARD_VALUES[idOfCard - YELLOW._0];
          break;
        default:
      }

    };
    this.toSeatNumber(userSeat, addCard);
  }
  removeCard(userSeat: number, idOfCard: number) {
    const removeCard = (arrayToChange: number[]) => {
      const color = getColor(idOfCard);
      switch (color) {
        case COLOR_RED:
          arrayToChange[0] -= CARD_VALUES[idOfCard - RED._0];
          break;
        case COLOR_GREEN:
          arrayToChange[1] -= CARD_VALUES[idOfCard - GREEN._0];
          break;
        case COLOR_BLUE:
          arrayToChange[2] -= CARD_VALUES[idOfCard - BLUE._0];
          break;
        case COLOR_YELLOW:
          arrayToChange[3] -= CARD_VALUES[idOfCard - YELLOW._0];
          break;
        default:
      }
    };
    this.toSeatNumber(userSeat, removeCard);
  }

  public A_colorBucks: number[] = [0, 0, 0, 0];
  public B_colorBucks: number[] = [0, 0, 0, 0];
  public C_colorBucks: number[] = [0, 0, 0, 0];
  public D_colorBucks: number[] = [0, 0, 0, 0];
}