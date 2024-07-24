import React, { useState, useContext, useEffect, useCallback } from 'react';
import SvgActivePlayerCards from './svg_activeplayercards';

import { useAppSelector } from '../store/hooks.ts';
import { selectActiveCards } from '../store/activeCards.ts';

export default function SvgActivePlayerCardHolder(props) {
  const cardArray = useAppSelector(selectActiveCards);

  return (<>
    <g transform="translate(270,400)">
      <SvgActivePlayerCards cardArray={cardArray} />
    </g>
  </>);
}