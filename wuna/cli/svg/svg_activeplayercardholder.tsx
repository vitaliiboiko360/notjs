import React, { useState, useContext, useEffect, useCallback } from 'react';
import { WebSocketContext } from '../websocketprovider';
import SvgActivePlayerCards from './svg_activeplayercards';

export default function SvgActivePlayerCardHolder(props) {
  const [cardArray, setCardArray] = useState([]);
  const webSocket = useContext(WebSocketContext);
  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    console.log('cardArray= ', cardArray);
    if (cardArray.length < 10)
      setCardArray([...cardArray, arBuf[0]]);
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
    <svg x="200" y="480" width="400px" height="120px">
      <SvgActivePlayerCards cardArray={cardArray} />
    </svg>
  </>);
}