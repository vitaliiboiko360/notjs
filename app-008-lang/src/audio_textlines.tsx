import React from 'react';
import Container from '@mui/material/Container';
import { useRef } from 'react';

import TextLines from './text_lines.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {
  const numChunks = 26; // TODO
  const audioRef = useRef(null);

  function setCurrentTime(lineIndex) {

    const totalTime = audioRef.current.duration;
    console.log(`duration ${totalTime}`);
    audioRef.current.currentTime = (totalTime / numChunks) * lineIndex;
    audioRef.current.play();

    console.log(`set current time to ${(totalTime / numChunks) * lineIndex}`);
    console.log(`clicked with index=${lineIndex}`);
  }

  function getCurrentIndex() {
    const totalTime = audioRef.current.duration;
    return Math.floor((audioRef.current.currentTime * numChunks) / totalTime);
  }

  return (
    <>
      <Audio ref={audioRef} />
      <Container>
        <TextLines
          getCurrentIndex={getCurrentIndex}
          onClick={setCurrentTime} />
      </Container>
    </>
  );
}