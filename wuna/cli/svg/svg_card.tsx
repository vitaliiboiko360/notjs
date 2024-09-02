import React, { forwardRef, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
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

const Card = (props) => {

  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  const refCard = useRef(null);

  const run = (element) => {
    // if (!refCard.current) {
    //   console.log('!refCard.current');
    //   return;
    // }
    let index;
    switch (lastPlayerId) {
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
      opacity: 1,
      ease: "none",
      repeat: -1,
    });
  };

  useGSAP(() => {
    if (lastPlayerCardId != 0 && !props.svg.current && refCard.current)
      run(refCard.current)
  }, { dependencies: [lastPlayerCardId], scope: props.svg.current, revertOnUpdate: true });


  if (lastPlayerCardId == 0 && lastPlayerId != USER_1) {
    console.log('lastPlayerCardId= ', lastPlayerCardId);
    return;
  }

  if (!isValidCard(lastPlayerCardId)) {
    console.log('!isValidCard(lastPlayerCardId== ', lastPlayerCardId, ' )==false');
    return;
  }

  if (!props.svg.current) {
    console.log('!!!REF isnt ready');
    return;
  }

  let x = Math.floor(Math.random() * CARD_HALF_WIDTH) + CARD_HALF_WIDTH;
  let y = Math.floor(Math.random() * CARD_HALF_HEIGHT) + CARD_HALF_HEIGHT;

  let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  element.setAttribute('transform', `matrix(1,0,0,1,${xCenter - x},${yCenter - y})`);

  props.svg.current.append(element);
  refCard.current = element;
  element.innerHTML = renderToString(getCard(lastPlayerCardId));

  return (<></>);
};

export default Card;