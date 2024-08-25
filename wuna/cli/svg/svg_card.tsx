import React, { forwardRef, useRef } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard, selectActiveMoveLastPlayerCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import setupAnimation from './animation/setup_animation.ts'
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { xCenter, yCenter } from './svg_cardsstack.tsx';

import { isValidCard, USER_1 } from '../websocketconsumer.tsx';

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

const Card = forwardRef((props, refGroupCenterTable) => {
  const refPreviousMove = useRef({ topCard: 0, lastPlayer: 0 });
  const topCardId = useAppSelector(selectActiveMoveCard);
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  // if (lastPlayerCardId != refPreviousMove.current.topCard)
  //   refPreviousMove.current.topCard = lastPlayerCardId;
  // if (lastPlayerId != refPreviousMove.current.lastPlayer)
  //   refPreviousMove.current.lastPlayer = lastPlayerId;


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

  let element = document.createElementNS('http://www.w3.org/2000/svg', 'cirle');
  element.setAttribute('cr', '');
  element.setAttribute('transform', `matrix(1,0,0,1,${xCenter - x},${yCenter - y})`);


  element.innerHTML = renderToString(getCard(topCardId));
  if (isValidCard(lastPlayerCardId))
    setupAnimation(element, lastPlayerId);

  refGroupCenterTable.current.append(element);

  refPreviousMove.current.topCard = lastPlayerCardId;
  refPreviousMove.current.lastPlayer = lastPlayerId;

  return (<></>);
});

export default Card;

function getPath(props) {
  return (<>
    <path d="M120,300 C120,300 300,260 400,300" fill="none" stroke="red" stroke-width="1px"></path>
    <path d="M400,170 C400,170 380,230 400,300" fill="none" stroke="green" stroke-width="1px"></path>
    <path d="M400,170 C400,170 420,230 400,300" fill="none" stroke="green" stroke-width="1px"></path>
    <path d="M680,300 C680,300 530,260 400,300" fill="none" stroke="blue" stroke-width="1px"></path>
    <path d="M400,430 C400,430 420,360 400,300" fill="none" stroke="blue" stroke-width="1px"></path>
    <path d="M400,430 C400,430 380,360 400,300" fill="none" stroke="blue" stroke-width="1px"></path></>);
}