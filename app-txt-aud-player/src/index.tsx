import ReactAudioPlayer from './player.tsx';
import React from 'react';

function Progress(props) {
    return (
        <p>{props.pos}</p>
    );
}

function Container() {
    return (
        <>
        <ReactAudioPlayer
        src="threepigs-sp-full-128.mp3"
        controls
        />
        <Progress pos="a" />
        </>
    );
}

function App() {
    return (
        <Container />
    );
  }

export default App;