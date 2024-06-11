import React from 'react';

const WsRecieveMessage = React.forwardRef((props, webSocketRef) => {

  React.useEffect(() => {
    if (!webSocketRef.current)
      return;

    webSocketRef
      .current
      .addEventListener("message",
        (event) => {
          let arBuf = new Uint8Array(event.data);
          console.log(`we recive `, arBuf);
        });
  }, []);

  return (null);
});

export default WsRecieveMessage;