import React from 'react';

const WsClient = React.forwardRef((props, ref) => {
  ref.current = new WebSocket('wss:/localhost:4001/wss');
  ref.current.binaryType = "arraybuffer";
  console.log('websocket created');
  console.log(`websocket type = ${ref.current.binaryType}`);
  return (<></>);
});
export default WsClient;