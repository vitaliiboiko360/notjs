import React, { useContext, useCallback, useEffect } from 'react';

import { WebSocketContext } from './websocketprovider.tsx';
import { useAppDispatch } from './store/hooks.ts';
import { updateActiveCards, updateActiveCardsByArray } from './store/activeCards.ts';
import { incrementLeftUserCardsNumber } from './store/leftUserCardsNumber.ts';
import { incrementTopUserCardsNumber } from './store/topUserCardsNumber.ts';
import { incrementRightUserCardsNumber } from './store/rightUserCardsNumber.ts';
import { updateActiveTableTopCard } from './store/activeTableTopCard.ts';

import { COLOR_OFFSETS, COLOR, getColor } from './svg/svg_getcard.tsx';

function isValidCard(idOfCard: number) {
  const NUMBER_OF_VALUES = 13;
  const BLACK_NUMBER_OF_VALUES = 2;

  if (idOfCard >= COLOR_OFFSETS.YELLOW_OFFSET
    && idOfCard <= COLOR_OFFSETS.YELLOW_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.BLUE_OFFSET
    && idOfCard <= COLOR_OFFSETS.BLUE_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.GREEN_OFFSET
    && idOfCard <= COLOR_OFFSETS.GREEN_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.RED_OFFSET
    && idOfCard <= COLOR_OFFSETS.RED_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.BLACK_OFFSET
    && idOfCard <= COLOR_OFFSETS.BLACK_OFFSET + BLACK_NUMBER_OF_VALUES) {
    return true;
  }
  return false;
}

function isValidUserCommand(inputNumber: number) {
  if (inputNumber >= 0 && inputNumber <= 8) {
    return true;
  }
}

enum COMMAND {
  ALLGAMESATE = 0,
  BOTTOM_USER_MOVE = 1,
  LEFT_USER_MOVE = 2,
  TOP_USER_MOVE = 3,
  RIGHT_USER_MOVE = 4,
  BOTTOM_USER_CARD_COUNT = 5,
  LEFT_USER_CARD_COUNT = 6,
  TOP_USER_CARD_COUNT = 7,
  RIGHT_USER_CARD_COUNT = 8,
}

function getCommand(inputNumber: number) {
  if (inputNumber in COMMAND) {
    return inputNumber;
  }
  return -1;
}

let staticCounter = 0;

function readMessage(inputArray: Uint8Array, dispatch) {
  for (let i = 0; i < inputArray.length; ++i) {
    let number = inputArray[i];
    if (i == 0 && isValidCard(number)) {
      dispatch(updateActiveTableTopCard(number));
    }
    if (getColor(number) == COLOR.BLUE) {
      dispatch(incrementLeftUserCardsNumber());
    }

    if (getColor(number) == COLOR.RED) {
      dispatch(incrementTopUserCardsNumber());
    }

    if (getColor(number) == COLOR.GREEN) {
      dispatch(incrementRightUserCardsNumber());
    }

    staticCounter++;
    if (staticCounter == 3) {
      // console.log('Dispatch active table top card =', number);
      dispatch(updateActiveTableTopCard(number));
      staticCounter = 0;
    }
  }
}

export default function WebSocketConsumer(props) {
  const webSocket = useContext(WebSocketContext);
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    readMessage(arBuf, dispatch);
  }, [dispatch]);

  useEffect(() => {
    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  return (<></>);
}