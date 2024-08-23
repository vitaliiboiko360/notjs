import React, { forwardRef, useRef } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { xCenter, yCenter } from './svg_cardsstack.tsx';

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

const Card = forwardRef((props, refGroupCenterTable) => {
  const refPreviousMove = useRef({ topCard: 0, lastPlayer: 0 });
  const topCardId = useAppSelector(selectActiveMoveCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  // if (topCardId != refPreviousMove.current.topCard)
  //   refPreviousMove.current.topCard = topCardId;
  // if (lastPlayerId != refPreviousMove.current.lastPlayer)
  //   refPreviousMove.current.lastPlayer = lastPlayerId;


  if (topCardId == 0) {
    console.log('topCardId= ', topCardId);
    return;
  }

  if (!refGroupCenterTable.current) {
    console.log('GroupCenter Card no REF !!!! topCardId=', topCardId);
    return;
  }

  let x = Math.floor(Math.random() * CARD_HALF_WIDTH) + CARD_HALF_WIDTH;
  let y = Math.floor(Math.random() * CARD_HALF_HEIGHT) + CARD_HALF_HEIGHT;

  let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  element.setAttribute('transform', `matrix(1,0,0,1,${xCenter - x},${yCenter - y})`);
  element.innerHTML = renderToString(getCard(topCardId));

  refGroupCenterTable.current.append(element);

  refPreviousMove.current.topCard = topCardId;
  refPreviousMove.current.lastPlayer = lastPlayerId;

  return (<></>);
});

export default Card;