import React, { useState, useContext, useEffect, useCallback } from 'react';
import SvgActivePlayerCards from './svg_activeplayercards';

import { useAppSelector } from '../store/hooks.ts';
import { selectActiveCards } from '../store/activeCards.ts';
import { selectActiveMoveCard, selectActiveMoveDirection, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import { isReverseCard, isSkipCard } from './svg_getcard.tsx';

function isOurTurn(activeCard: number, isDirectionClockwize: boolean, lastPlayerId: number) {
  if (isDirectionClockwize && lastPlayerId == 2 && isReverseCard(activeCard)) {
    return true;
  }
  if (!isDirectionClockwize && lastPlayerId == 4 && isReverseCard(activeCard)) {
    return true;
  }
  if (isDirectionClockwize && lastPlayerId == 4 && !isSkipCard(activeCard)) {
    return true;
  }
  if (!isDirectionClockwize && lastPlayerId == 2 && !isSkipCard(activeCard)) {
    return true;
  }
  if (lastPlayerId == 3 && isSkipCard(activeCard)) {
    return true;
  }
  return false;
}

export default function SvgActivePlayerCardHolder(props) {
  const cardArray = useAppSelector(selectActiveCards);

  const activeCard = useAppSelector(selectActiveMoveCard);
  const activeDirection = useAppSelector(selectActiveMoveDirection);
  const activeLastPlayer = useAppSelector(selectActiveMoveLastPlayer);

  const [ourTurn, setOurTurn] = useState(false);
  setOurTurn(isOurTurn(activeCard, activeDirection, activeLastPlayer));

  return (<>
    <g transform="translate(270,400)">
      <SvgActivePlayerCards isOurTurn={ourTurn} activeCard={activeCard} cardArray={cardArray} />
    </g>
  </>);
}