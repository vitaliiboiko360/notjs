import React, { Fragment, useContext, useEffect } from 'react';

import { getCard, isCardPlayable, isCardSameColor } from './svg_getcard';
import getOnClickForCard from './active_player/getOnClickForCard.ts';

import { WebSocketContext } from '../websocketprovider.tsx';
import { useAppSelector, useAppDispatch } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { selectActiveMoveWildCardColor } from '../store/activeMove.ts';
import { USER_1 } from '../websocketconsumer.tsx';

function sendSkipMoveToServer(websocket, seatNumber) {
  let arrayToSend: Uint8Array = new Uint8Array(3);
  arrayToSend[0] = seatNumber;
  arrayToSend[1] = 0;
  arrayToSend[2] = 33;
  websocket.send(arrayToSend);
}

export default function SvgActivePlayerCards(props) {
  const webSocket = useContext(WebSocketContext);
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const activeWildCardColorToPlay = useAppSelector(selectActiveMoveWildCardColor);

  let playableCardCounter = 0;

  useEffect(() => {
    if (playableCardCounter == 0 && props.isOurTurn) {
      console.log('props.isOurTurn =', props.isOurTurn, ' playableCardCounter=', playableCardCounter);
    }
  }, []);

  const dispatch = useAppDispatch();

  if (activePlayerSeatNumber == 0) {
    console.log(`activePlayerSeatNumber == 0`);
    return (<></>);
  }

  //console.log(`props.cardsArray.length=${props.cardArray.length}`);
  return (<>
    {props
      .cardArray
      .map((card, index) => {
        let transformString = '';
        const isPlayable = props.isOurTurn && (isCardPlayable(card, props.activeCard) || isCardSameColor(card, activeWildCardColorToPlay));
        if (isPlayable) {
          playableCardCounter++;
          transformString = `translate(${(index * 15) - 10},${-40})`;
        } else
          transformString = `translate(${(index * 15) - (10 * playableCardCounter)})`; // 20px -> step to the right on X axe

        if (index == props.cardArray.length - 1) {
          if (props.isOurTurn && playableCardCounter == 0) {
            console.log('props.isOurTurn =', props.isOurTurn, ' playableCardCounter=', playableCardCounter);
            setTimeout(() => sendSkipMoveToServer(webSocket, activePlayerSeatNumber), 1500);
          }
        }
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