import React, { useRef } from 'react';
import Card from './svg_card';
import { SVG_DIMENSIONS } from './svg_container';

const xCenter = SVG_DIMENSIONS.width / 2;
const yCenter = SVG_DIMENSIONS.height / 2;

const xPos = xCenter / 2;
const yPos = yCenter / 2;

const k = 2;

export default function SvgCardStack(props) {
  const svgCardStack_ref = useRef(null);
  return (<svg ref={svgCardStack_ref} x={xPos} y={yPos} width={xCenter} height={yCenter} >
    <Card ref={svgCardStack_ref} />
  </svg>);
}