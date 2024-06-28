import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import { WebSocketContext } from '../websocketprovider';
import { getCard1, getCard2 } from './svg_getcard';

import { renderToString } from 'react-dom/server';

let key = 0;

const Card = forwardRef((props, svgCardStack_ref) => {
  const [whichCard, setWhichCard] = useState(-1);

  const webSocket = useContext(WebSocketContext);
  useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      setWhichCard(arBuf[0]);
    };

    if (svgCardStack_ref.current == null) {
      console.log(`svg element isn't ready yet`);
      return;
    }

    webSocket.addEventListener("message", onMessage);

    return () => webSocket.removeEventListener("message", onMessage);
  });

  if (whichCard == -1) {
    console.log(`initial state`);
    return (<></>);
  }

  let angle = Math.random() * 100 % 15;
  if (whichCard > 50) {
    svgCardStack_ref.current.appendChild(document.createElement(renderToString(getCard1(0, angle))));
  } else {
    svgCardStack_ref.current.appendChild(document.createElement(renderToString(getCard2(0, angle))));
  }

  return (<></>);
});

export default Card;