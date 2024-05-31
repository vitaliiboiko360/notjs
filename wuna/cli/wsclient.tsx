import React from 'react';

export default function WsClient() {
  let webSocket = new WebSocket('ws:/localhost:4001');
  console.log('websocket created');
  return (<><p>'websocket created'</p></>);
}