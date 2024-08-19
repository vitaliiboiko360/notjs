import React, { forwardRef } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard } from '../store/activeMove.ts';
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

const Card = forwardRef((props, refGroupCenterTable) => {
  const topCardId = useAppSelector(selectActiveMoveCard);
  console.log('topCardId= ', topCardId);
  if (topCardId == 0) {

    return;
  }

  if (!refGroupCenterTable.current) {
    console.log('GroupCenter Card no REF !!!! topCardId=', topCardId);
    return;
  }
  const transformString = props.transformString;
  // console.log('transformString=', transformString);
  const [_0, _1, _2, _3, _4, xDelta, yDelta] = transformString.match(/matrix\(([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+)\)/);
  // console.log('xDelta=', xDelta);
  // console.log('yDelta=', yDelta);
  let x = Math.floor(Math.random() * CARD_HALF_WIDTH) + CARD_HALF_WIDTH;
  let y = Math.floor(Math.random() * CARD_HALF_HEIGHT) + CARD_HALF_HEIGHT;
  // console.log(JSON.stringify(transformString.match(/matrix\(([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+)\)/)));
  let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  element.setAttribute('transform', `matrix(1,0,0,1,${xDelta - x},${yDelta - y})`);
  element.innerHTML = renderToString(getCard(topCardId));
  refGroupCenterTable.current.append(element);

  return (<></>);
});

export default Card;