import React from 'react';
import WsClient from './wsclient';
import WsSendMessage from './wssendmessage';
import GameField from './game_field';

export default function Main() {
  const webSocketRef = React.useRef(null);
  return (<>
    <WsClient ref={webSocketRef} />
    <WsSendMessage ref={webSocketRef} />
    <GameField />
  </>);
}