import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../websocketprovider'

import { getCard1, getCard2 } from './svg_getcard';

export default function SvgCardHolder(props) {

  const [whichCard, setWhichCard] = useState(0);

  const webSocket = useContext(WebSocketContext);

  React.useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      console.log(arBuf[0]);
      setWhichCard(arBuf[0])
    };

    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  if (whichCard > 50) {
    return getCard1();
  }
  return getCard2();
}