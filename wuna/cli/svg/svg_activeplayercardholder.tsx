import React, { useState, useContext, useEffect, useCallback } from 'react';
import { WebSocketContext } from '../websocketprovider';
import SvgActivePlayerCards from './svg_activeplayercards';

export default function SvgActivePlayerCardHolder(props) {
  const [cardsArray, setCardsArray] = useState([]);
  const webSocket = useContext(WebSocketContext);
  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    // console.log(arBuf[0]);
    // console.log(cardsArray);
    if (cardsArray.length < 10) {
      setCardsArray([...cardsArray, arBuf[0]]);
      console.log(cardsArray);
    }
  }, [cardsArray]);
  useEffect(() => {
    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  return (<>
    <svg x="200" y="480" width="400px" height="120px">
      <SvgActivePlayerCards cardsArray={cardsArray} />
    </svg>
  </>);
}