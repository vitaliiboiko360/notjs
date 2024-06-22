import React, { useRef, useEffect } from 'react';
import Card from './svg_card';
import { SVG_DIMENSIONS } from './svg_container';
import { WebSocketContext } from '../websocketprovider'

const xCenter = SVG_DIMENSIONS.width / 2;
const yCenter = SVG_DIMENSIONS.height / 2;

const xPos = xCenter / 2;
const yPos = yCenter / 2;

export default function SvgCardStack(props) {
  const webSocket = useContext(WebSocketContext);
  useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      console.log(`from onMessage inside card stack`);
      setWhichCard(arBuf[0]);
    };

    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    };
  }, []);
  const svgCardStack_ref = useRef(null);
  return (<svg ref={svgCardStack_ref} x={xPos} y={yPos} width={xCenter} height={yCenter} >
    <Card ref={svgCardStack_ref} />
  </svg>);
}