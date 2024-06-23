import React, { useRef, forwardRef } from 'react';
import Card from './svg_card';
import { SVG_DIMENSIONS } from './svg_container';

const xCenter = SVG_DIMENSIONS.width / 2;
const yCenter = SVG_DIMENSIONS.height / 2;

const xPos = xCenter / 2;
const yPos = yCenter / 2;

const SvgForCards = forwardRef((props, svgCardStack_ref) => {
  return (<svg ref={svgCardStack_ref} x={xPos} y={yPos} width={xCenter} height={yCenter} >
  </svg>);
});

export default function SvgCardStack(props) {
  const svgCardStack_ref = useRef(null);
  return (<>
    <SvgForCards ref={svgCardStack_ref} />
    <Card ref={svgCardStack_ref} />
  </>);
}