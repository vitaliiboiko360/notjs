
export const NUBMER_OF_CARDS = 54;
export const NUBMER_OF_DECKS = 4;
export const NUMBER_OF_COLOR_CARDS = 13;
export const NUMBER_OF_BLACK_CARDS = 2;

// universal
export enum UNIVERSAL {
  UNIVERSAL_PlusFour = 10,
  UNIVERSAL
}

// red, green, blue, yelow
export enum RED {
  _0 = 20,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _SkipStep,
  _PlusTwo
}

export enum GREEN {
  _0 = 40,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _SkipStep,
  _PlusTwo
}

export enum BLUE {
  _0 = 60,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _SkipStep,
  _PlusTwo
}

export enum YELLOW {
  _0 = 80,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _SkipStep,
  _PlusTwo
}

export function isValidCard(idOfCard: number) {
  if (idOfCard == UNIVERSAL.UNIVERSAL_PlusFour
    || idOfCard == UNIVERSAL.UNIVERSAL)
    return true;
  if (idOfCard >= RED._0
    && idOfCard <= RED._PlusTwo)
    return true;
  if (idOfCard >= GREEN._0
    && idOfCard <= GREEN._PlusTwo)
    return true;
  if (idOfCard >= BLUE._0
    && idOfCard <= BLUE._PlusTwo)
    return true;
  if (idOfCard >= YELLOW._0
    && idOfCard <= YELLOW._PlusTwo)
    return true;

  return false;
}