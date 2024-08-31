import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard, selectActiveMoveLastPlayerCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import setupAnimation from './animation/setup_animation.ts'
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { IDPATH, PATHDATA, xCenter, yCenter } from './svg_cardsstack.tsx';

import { isValidCard, USER_1, USER_2, USER_3, USER_4 } from '../websocketconsumer.tsx';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

let g_idCounter = 0;

const Card = forwardRef((props, refGroupCenterTable) => {
  const refPreviousMove = useRef({ topCard: 0, lastPlayer: 0 });
  const topCardId = useAppSelector(selectActiveMoveCard);
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  // if (lastPlayerCardId != refPreviousMove.current.topCard)
  //   refPreviousMove.current.topCard = lastPlayerCardId;
  // if (lastPlayerId != refPreviousMove.current.lastPlayer)
  //   refPreviousMove.current.lastPlayer = lastPlayerId;
  const id = `cardId${g_idCounter++}`;

  const refCard = useRef(null);


  let index;
  switch (lastPlayerCardId) {
    case USER_1:
      index = 4;
      break;
    case USER_2:
      index = 0;
      break;
    case USER_3:
      index = 1;
      break;
    case USER_4:
      index = 2;
      break;
    default:
  };


  const run = (element) => {
    // if (!refCard.current) {
    //   console.log('!refCard.current');
    //   return;
    // }
    if (typeof index === 'undefined')
      return;

    console.log('PATHDATA[index]=', PATHDATA[index]);

    gsap.to(element, {
      motionPath: {
        path: PATHDATA[index],
        align: PATHDATA[index],
        alignOrigin: [0.5, 0.5]
      },
      duration: 2,
    });
  };

  useGSAP(() => {
    if (refCard.current) {
      console.log('before run');
      run(refCard.current);
    }
  });

  if (lastPlayerCardId == 0 && lastPlayerId != USER_1) {
    console.log('lastPlayerCardId= ', lastPlayerCardId);
    return;
  }

  if (!refGroupCenterTable.current) {
    console.log('GroupCenter Card no REF !!!! lastPlayerCardId=', lastPlayerCardId);
    return;
  }

  if (!isValidCard(lastPlayerCardId)) {
    console.log('!isValidCard(lastPlayerCardId== ', lastPlayerCardId, ' )==false');
    return;
  }

  let x = Math.floor(Math.random() * CARD_HALF_WIDTH) + CARD_HALF_WIDTH;
  let y = Math.floor(Math.random() * CARD_HALF_HEIGHT) + CARD_HALF_HEIGHT;

  let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  element.setAttribute('transform', `matrix(1,0,0,1,${xCenter - x},${yCenter - y})`);
  element.setAttribute('id', id);
  // element.style.opacity = "0";


  // if (isValidCard(lastPlayerCardId))
  //   setupAnimation(element, lastPlayerId);

  refGroupCenterTable.current.append(element);
  refCard.current = element;
  element.innerHTML = renderToString(getCard(topCardId));

  refPreviousMove.current.topCard = lastPlayerCardId;
  refPreviousMove.current.lastPlayer = lastPlayerId;

  return (<></>);
});

export default Card;