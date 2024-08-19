import React, { Fragment, useContext } from 'react';

import { getCard, isCardPlayable } from './svg_getcard';
import getOnClickForCard from './active_player/getOnClickForCard.ts';

import { WebSocketContext } from '../websocketprovider.tsx';
import { useAppSelector, useAppDispatch } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';

export default function SvgActivePlayerCards(props) {
  const webSocket = useContext(WebSocketContext);
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const dispatch = useAppDispatch();

  if (activePlayerSeatNumber == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  console.log(`props.cardsArray.length=${props.cardArray.length}`);
  let playableCardCounter = 0;
  return (<>
    {props
      .cardArray
      .map((card, index) => {
        let transformString = '';
        const isPlayable = props.isOurTurn && isCardPlayable(card, props.activeCard);
        if (isPlayable) {
          playableCardCounter++;
          transformString = `translate(${(index * 15) - 10},${-40})`;
        } else
          transformString = `translate(${(index * 15) - (10 * playableCardCounter)})`; // 20px -> step to the right on X axe
        return (
          <Fragment key={index}>
            <g transform={transformString} onClick={isPlayable ? getOnClickForCard(card, webSocket, activePlayerSeatNumber, dispatch) : undefined} >
              {getCard(card)}
            </g>
          </Fragment>
        );
      })}
  </>);
}