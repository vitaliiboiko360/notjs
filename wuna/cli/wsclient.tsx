import React from 'react';

const WsClient = React.forwardRef((props, ref) => {
  ref.current = new WebSocket('wss:/localhost:4001/wss');
  console.log('websocket created');
  return (<><p>'websocket created'</p></>);
});
export default WsClient;