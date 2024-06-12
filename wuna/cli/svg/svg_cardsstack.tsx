import React from 'react';

import { SVG_DIMENSIONS } from './svg_container';

const xCenter = SVG_DIMENSIONS.width / 2;
const yCenter = SVG_DIMENSIONS.height / 2;

const xPos = xCenter / 2;
const yPos = yCenter / 2;

const k = 2;

export default function SvgCardStack(props) {
  return (<svg overflow='visible' x={0} y={0} width={xCenter * k} height={yCenter * k} >
    {props.children}
  </svg>);
}