import React, { useState, useContext, useEffect, useCallback } from 'react';
import { WebSocketContext } from '../websocketprovider';
import SvgActivePlayerCards from './svg_activeplayercards';

export default function SvgActivePlayerCardHolder(props) {
  const [cardArray, setCardArray] = useState([]);
  const webSocket = useContext(WebSocketContext);

  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    console.log('cardArray= ', cardArray);

    setCardArray([arBuf[0], arBuf[1], ...cardArray.slice(0, 10)]);
  }, [cardArray]);

  useEffect(() => {
    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, [cardArray]);

  return (<>
    <g transform="translate(300,400)">
      <SvgActivePlayerCards cardArray={cardArray} />
    </g>
  </>);
}