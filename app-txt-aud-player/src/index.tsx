import ReactAudioPlayer from './player.tsx';
import React from 'react';

function Progress(n) {
    return (
        `<p>${n}%</p>`
    );
}

function Container() {
    return (
        <ReactAudioPlayer
        src="threepigs-sp-full-128.mp3"
        controls
        />
        <Progress n="" />
    );
}

function App() {
    return (
        <Container />
    );
  }

export default App;