import React, { useRef, forwardRef } from 'react';
import Card from './svg_card';
import { SVG_DIMENSIONS } from './svg_container';

import { useAppSelector } from '../store/hooks.ts';
import { selectActiveMoveCard, selectActiveMoveLastPlayerCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';

export const xCenter = SVG_DIMENSIONS.width / 2;
export const yCenter = SVG_DIMENSIONS.height / 2;

export default function SvgCardStack(props) {

  const topCardId = useAppSelector(selectActiveMoveCard);
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  const getMove = (topCard, lastPlayer, lastCard) => {

  }

  return (<>
    <Card move={ } />
  </>);
}

export const IDPATH: string[] = [
  "pathLeft"
  , "pathTopLeft"
  , "pathTopRight"
  , "pathRight"
  , "pathBottomRight"
  , "pathBottomLeft"
];

export const PATHDATA: string[] = [
  "M120,300 C120,300 300,260 400,300",
  "M400,170 C400,170 380,230 400,300",
  "M400,170 C400,170 420,230 400,300",
  "M680,300 C680,300 530,260 400,300",
  "M400,430 C400,430 420,360 400,300",
  "M400,430 C400,430 380,360 400,300"
];


export function SvgCardPaths() {
  return (<>
    <path id={IDPATH[0]} d="M120,300 C120,300 300,260 400,300" fill="none"></path>
    <path id={IDPATH[1]} d="M400,170 C400,170 380,230 400,300" fill="none"></path>
    <path id={IDPATH[2]} d="M400,170 C400,170 420,230 400,300" fill="none"></path>
    <path id={IDPATH[3]} d="M680,300 C680,300 530,260 400,300" fill="none"></path>
    <path id={IDPATH[4]} d="M400,430 C400,430 420,360 400,300" fill="none"></path>
    <path id={IDPATH[5]} d="M400,430 C400,430 380,360 400,300" fill="none"></path></>);
}