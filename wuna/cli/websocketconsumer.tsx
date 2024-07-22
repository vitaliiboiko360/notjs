import React, { useContext, useCallback, useEffect } from 'react';

import { WebSocketContext } from './websocketprovider.tsx';

export default function WebSocketConsumer(props) {
  const webSocket = useContext(WebSocketContext);

  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    //console.log('cardArray= ', arBuf);
  }, []);

  useEffect(() => {
    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  return (<></>);
}