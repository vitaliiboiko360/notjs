

import { NUMBER_OF_COLOR_CARDS, NUMBER_OF_BLACK_CARDS, NUBMER_OF_CARDS, NUBMER_OF_DECKS, RED, GREEN, BLUE, YELLOW, UNIVERSAL } from "./Cards";

function shuffleArray(arrayToShuffle: number[]) {
  for (let i = 0; i < arrayToShuffle.length; ++i) {
    let index = (Math.random() * (arrayToShuffle.length - i)) + i;
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
      = RED.RED_0 + i;
    let j = i + NUMBER_OF_COLOR_CARDS;
    retArray[j]
      = retArray[j + (NUBMER_OF_CARDS)]
      = retArray[j + (NUBMER_OF_CARDS * 2)]
      = retArray[j + (NUBMER_OF_CARDS * 3)]
      = GREEN.GREEN_0 + i;
    let k = j + NUMBER_OF_COLOR_CARDS;
    retArray[k]
      = retArray[k + (NUBMER_OF_CARDS)]
      = retArray[k + (NUBMER_OF_CARDS * 2)]
      = retArray[k + (NUBMER_OF_CARDS * 3)]
      = BLUE.BLUE_0 + i;
    let l = k + NUMBER_OF_COLOR_CARDS;
    retArray[l]
      = retArray[l + (NUBMER_OF_CARDS)]
      = retArray[l + (NUBMER_OF_CARDS * 2)]
      = retArray[l + (NUBMER_OF_CARDS * 3)]
      = BLUE.BLUE_0 + i;
    if (i < 2) {
      let m = l + NUMBER_OF_COLOR_CARDS;
      retArray[m]
        = retArray[m + (NUBMER_OF_CARDS)]
        = retArray[m + (NUBMER_OF_CARDS * 2)]
        = retArray[m + (NUBMER_OF_CARDS * 3)]
        = UNIVERSAL.UNIVERSAL + i;
    }
  }
  shuffleArray(retArray);
  return retArray;
}

export class Game {
  constructor() {
    this.CardArray = initCardArray();
  }

  removeCard(idOfCard: number, userSeat: number) {
    const removeFromCardArray = (cardArray: number[], idOfCard: number, userTag: string) => {
      const index = cardArray.indexOf(idOfCard);
      if (index == -1) {
        console.log('requested remove card=', idOfCard, ` from ${userTag} user!`);
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

  topCard: number = -1;
  A_UserCards: number[] = [];
  B_UserCards: number[] = [];
  C_UserCards: number[] = [];
  D_UserCards: number[] = [];

  CardArray: number[] = [];


};

