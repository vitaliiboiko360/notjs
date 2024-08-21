import React, { useState, useContext, useEffect, useCallback } from 'react';
import SvgActivePlayerCards from './svg_activeplayercards';

import { useAppSelector } from '../store/hooks.ts';
import { selectActiveCards } from '../store/activeCards.ts';
import { selectActiveMoveCard, selectActiveMoveDirection, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import { isReverseCard, isSkipCard } from './svg_getcard.tsx';

function isOurTurn(activeCard: number, isDirectionClockwize: boolean, lastPlayerId: number) {
  console.log('activeCard=', activeCard, 'isDirectionClockwize=', isDirectionClockwize, 'lastPlayerId=', lastPlayerId,
    'isSkipCard(activeCard)=', isSkipCard(activeCard)
  );
  if (isDirectionClockwize && lastPlayerId == 4) {
    return true;
  }
  if (!isDirectionClockwize && lastPlayerId == 2) {
    return true;
  }
  return false;
}

export default function SvgActivePlayerCardHolder(props) {
  const cardArray = useAppSelector(selectActiveCards);

  const activeCard = useAppSelector(selectActiveMoveCard);
  const activeDirection = useAppSelector(selectActiveMoveDirection);
  const activeLastPlayer = useAppSelector(selectActiveMoveLastPlayer);

  return (<>
    <g transform="translate(270,400)">
      <SvgActivePlayerCards isOurTurn={isOurTurn(activeCard, activeDirection, activeLastPlayer)} activeCard={activeCard} cardArray={cardArray} />
    </g>
  </>);
}