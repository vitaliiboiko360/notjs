import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { WebSocketContext } from '../websocketprovider'

const Card = forwardRef((props)=>{
  const [whichCard, setWhichCard] = useState(0);
  const webSocket = useContext(WebSocketContext);
  useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      setWhichCard(arBuf[0]);
    };

    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    };
  }, []);

  return (<></>);
});

export default Card;