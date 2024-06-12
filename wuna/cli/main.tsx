import React from 'react';

import GameField from './game_field';
import WebSocketContextProvider from './websocketprovider';

export default function Main() {
  return (
    <WebSocketContextProvider>
      <GameField />
    </WebSocketContextProvider>
  );
}