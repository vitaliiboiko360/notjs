import React, { useContext, useCallback, useEffect } from 'react';

import { WebSocketContext } from './websocketprovider.tsx';
import { useAppDispatch, AppDispatch } from './store/hooks.ts';
import { updateActiveCards, updateActiveCardsByArray } from './store/activeCards.ts';
import { updateBottomUserCardsNumber } from './store/bottomUser.ts';
import { updateLeftUserCardsNumber } from './store/leftUser.ts';
import { updateTopUserCardsNumber } from './store/topUser.ts';
import { updateRightUserCardsNumber } from './store/rightUser.ts';
import { updateActiveMove, updateActiveMoveCard, updateActiveMoveLastPlayer } from './store/activeMove.ts';
import { updateActivePlayerSeatNumber } from './store/activePlayerSeatNumber.ts';

import { COLOR_OFFSETS, COLOR, isReverseCard } from './svg/svg_getcard.tsx';

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

enum USER {
  BOTTOM = 1,
  LEFT,
  TOP,
  RIGHT
}

function getCommand(inputNumber: number) {
  if (inputNumber in COMMAND) {
    return inputNumber;
  }
  return -1;
}

let staticCounter = 0;

function processGuestMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  if (inputArray.length < 6) {
    console.log('inputArray length=', inputArray.length);
    return;
  }
  let topCard = inputArray[1];
  if (isValidCard(topCard)) {
    dispatch(updateActiveMoveCard(topCard));
  }
  dispatch(updateBottomUserCardsNumber(inputArray[2]));
  dispatch(updateLeftUserCardsNumber(inputArray[3]));
  dispatch(updateTopUserCardsNumber(inputArray[4]));
  dispatch(updateRightUserCardsNumber(inputArray[5]));
}

function processPlayerMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  let userSeat = inputArray[0];
  let move = inputArray[1];
  updateActiveMove(move, userSeat);
}

function processSeatRequestMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  console.log('SEAT REQ srv responded with=', inputArray[0]);
  dispatch(updateActivePlayerSeatNumber(inputArray[0]));
}

function readMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  if (inputArray[0] >= 1 && inputArray[0] <= 4) {
    return processPlayerMessage(inputArray, dispatch);
  }

  if (inputArray[0] == 0) {
    return processGuestMessage(inputArray, dispatch);
  }

  if (inputArray[0] >= 5 && inputArray[0] <= 8) {
    return processSeatRequestMessage(inputArray, dispatch);
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