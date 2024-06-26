import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import { createRoot } from 'react-dom/client';
import { WebSocketContext } from '../websocketprovider';
import { getCard1, getCard2 } from './svg_getcard';

const Card = forwardRef((props, svgCardStack_ref) => {
  const [whichCard, setWhichCard] = useState(-1);
  const [isRootRendered, setIsRootRendered] = useState(false);
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

  if (whichCard == -1 || !isRootRendered) {
    console.log(`initial state`);
    return;
  }

  if (!isRootRendered) {
    const root = createRoot(svgCardStack_ref.current);
    setIsRootRendered(true);
    if (whichCard > 50) {
      root.render(getCard1());
    } else {
      root.render(getCard2());
    }
  }

  return (<></>);
});

export default Card;