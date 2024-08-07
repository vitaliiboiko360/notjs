
export const NUBMER_OF_CARDS = 54;
export const NUBMER_OF_DECKS = 4;
export const NUMBER_OF_COLOR_CARDS = 13;
export const NUMBER_OF_BLACK_CARDS = 2;

// wild cards
export enum WILD {
  Wild = 14,
  Draw4
}

// red, green, blue, yelow
export enum RED {
  _0 = 16,
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
  _Skip,
  _Draw2
}

export enum GREEN {
  _0 = 32,
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
  _Skip,
  _Draw2
}

export enum BLUE {
  _0 = 48,
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
  _Skip,
  _Draw2
}

export enum YELLOW {
  _0 = 64,
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
  _Skip,
  _Draw2
}

export function isValidCard(idOfCard: number) {
  if (idOfCard == WILD.Draw4
    || idOfCard == WILD.Wild)
    return true;
  if (idOfCard >= RED._0
    && idOfCard <= RED._Draw2)
    return true;
  if (idOfCard >= GREEN._0
    && idOfCard <= GREEN._Draw2)
    return true;
  if (idOfCard >= BLUE._0
    && idOfCard <= BLUE._Draw2)
    return true;
  if (idOfCard >= YELLOW._0
    && idOfCard <= YELLOW._Draw2)
    return true;

  return false;
}

export function getColor(idOfCard: number) {
  if (idOfCard & 0b01000000)
    return 4;
  if (idOfCard & 0b00110000)
    return 3;
  if (idOfCard & 0b00100000)
    return 2;
  if (idOfCard & 0b00010000)
    return 1;

  return 0;
}