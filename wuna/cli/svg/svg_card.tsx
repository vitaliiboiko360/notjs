import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { WebSocketContext } from '../websocketprovider'

const Card = forwardRef((props) => {
  const [whichCard, setWhichCard] = useState(0);
  const webSocket = useContext(WebSocketContext);
  useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      setWhichCard(arBuf[0]);
    };

    if (svgCardStack_ref.current == null) {
      console.log(`svg element isn't ready yet`);
    }


    return (<></>);
  });
});

export default Card;