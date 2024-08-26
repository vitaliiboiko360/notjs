import React, { forwardRef, useRef } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard, selectActiveMoveLastPlayerCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import setupAnimation from './animation/setup_animation.ts'
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { xCenter, yCenter } from './svg_cardsstack.tsx';

import { isValidCard, USER_1 } from '../websocketconsumer.tsx';

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
  let tween = gsap.to(id, {
    motionPath: {
      path: "#path",
    },
    transformOrigin: "50% 50%",
    duration: 2,
  });

  if (lastPlayerCardId == 0 && lastPlayerId != USER_1) {
    console.log('lastPlayerCardId= ', lastPlayerCardId);
    return;
  }

  if (!refGroupCenterTable.current) {
    console.log('GroupCenter Card no REF !!!! lastPlayerCardId=', lastPlayerCardId);
    return;
  }

  let x = Math.floor(Math.random() * CARD_HALF_WIDTH) + CARD_HALF_WIDTH;
  let y = Math.floor(Math.random() * CARD_HALF_HEIGHT) + CARD_HALF_HEIGHT;

  let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  element.setAttribute('transform', `matrix(1,0,0,1,${xCenter - x},${yCenter - y})`);


  if (isValidCard(lastPlayerCardId))
    setupAnimation(element, lastPlayerId);

  element.innerHTML = renderToString(getCard(topCardId));

  refGroupCenterTable.current.append(element);
  tween.play();

  refPreviousMove.current.topCard = lastPlayerCardId;
  refPreviousMove.current.lastPlayer = lastPlayerId;

  return (<></>);
});

export default Card;