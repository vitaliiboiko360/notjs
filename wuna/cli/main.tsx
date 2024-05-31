import React from 'react';
import WsClient from './wsclient';
import WsSendMessage from './wssendmessage';

export default function Main() {
  const webSocketRef = React.useRef(null);
  return (<>
    <WsClient ref={webSocketRef} />
    <WsSendMessage ref={webSocketRef} />
  </>);
}