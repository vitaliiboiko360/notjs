import React from 'react';

const WsSendMessage = React.forwardRef((props, webSocketRef) => {

  const onclick = () => {
    if (webSocketRef.current.readyState != 0) {
      let arBuf = new Uint16Array(10);
      arBuf[0] = 1000;
      arBuf[1] = 2000;
      console.log(arBuf);
      webSocketRef.current.send(arBuf);
    }
  };

  return (<>
    <button onClick={onclick}>Click to send message</button></>);
});

export default WsSendMessage;