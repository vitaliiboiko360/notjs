
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
  RED_0 = 20,
  RED_1,
  RED_2,
  RED_3,
  RED_4,
  RED_5,
  RED_6,
  RED_7,
  RED_8,
  RED_9,
  RED_Reverse,
  RED_SkipStep,
  RED_PlusTwo
}

export enum GREEN {
  GREEN_0 = 40,
  GREEN_1,
  GREEN_2,
  GREEN_3,
  GREEN_4,
  GREEN_5,
  GREEN_6,
  GREEN_7,
  GREEN_8,
  GREEN_9,
  GREEN_Reverse,
  GREEN_SkipStep,
  GREEN_PlusTwo
}

export enum BLUE {
  BLUE_0 = 60,
  BLUE_1,
  BLUE_2,
  BLUE_3,
  BLUE_4,
  BLUE_5,
  BLUE_6,
  BLUE_7,
  BLUE_8,
  BLUE_9,
  BLUE_Reverse,
  BLUE_SkipStep,
  BLUE_PlusTwo
}

export enum YELLOW {
  YELLOW_0 = 80,
  YELLOW_1,
  YELLOW_2,
  YELLOW_3,
  YELLOW_4,
  YELLOW_5,
  YELLOW_6,
  YELLOW_7,
  YELLOW_8,
  YELLOW_9,
  YELLOW_Reverse,
  YELLOW_SkipStep,
  YELLOW_PlusTwo
}

export function isValidCard(idOfCard: number) {
  if (idOfCard == UNIVERSAL.UNIVERSAL_PlusFour
    || idOfCard == UNIVERSAL.UNIVERSAL)
    return true;
  if (idOfCard >= RED.RED_0
    && idOfCard <= RED.RED_PlusTwo)
    return true;
  if (idOfCard >= GREEN.GREEN_0
    && idOfCard <= GREEN.GREEN_PlusTwo)
    return true;
  if (idOfCard >= BLUE.BLUE_0
    && idOfCard <= BLUE.BLUE_PlusTwo)
    return true;
  if (idOfCard >= YELLOW.YELLOW_0
    && idOfCard <= YELLOW.YELLOW_PlusTwo)
    return true;

  return false;
}