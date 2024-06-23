import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { WebSocketContext } from '../websocketprovider'

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

    return () => webSocket.removeEventLisnter("message", onMessage);
  });

  if (whichCard != -1) {

  }

  return (<></>);
});

export default Card;