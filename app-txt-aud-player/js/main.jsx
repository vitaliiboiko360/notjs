import React from 'react';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from '../src/index.tsx';

ReactDOM.render(
  <ReactAudioPlayer
    src="/files/George_Gershwin_playing_Rhapsody_in_Blue.ogg"
    controls
  />,
  document.querySelector('.app'),
);
