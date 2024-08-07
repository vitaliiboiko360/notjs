import React, { useRef, forwardRef } from 'react';
import Card from './svg_card';
import { SVG_DIMENSIONS } from './svg_container';

const xCenter = SVG_DIMENSIONS.width / 2;
const yCenter = SVG_DIMENSIONS.height / 2;
const transformString = `matrix(1,0,0,1,${xCenter},${yCenter})`;

const SvgForCards = forwardRef((props, refGroupCenterTable) => {
  return (<g ref={refGroupCenterTable} transfrom={transformString}  >
  </g>);
});

export default function SvgCardStack(props) {
  const refGroupCenterTable = useRef(null);
  return (<>
    <SvgForCards ref={refGroupCenterTable} />
    <Card transformString={transformString} ref={refGroupCenterTable} />
  </>);
}