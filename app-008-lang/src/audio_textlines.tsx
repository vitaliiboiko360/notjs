import React from 'react';
import Container from '@mui/material/Container';
import { useRef } from 'react';

import TextLines from './text_lines.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {
  const numChunks = 26; // TODO
  const inputRef = useRef(null);

  function setCurrentTime(lineIndex) {

    const totalTime = inputRef.current.duration;
    console.log(`duration ${totalTime}`);
    inputRef.current.currentTime = (totalTime / numChunks) * lineIndex;
    inputRef.current.play();

    console.log(`set current time to ${(totalTime / numChunks) * lineIndex}`);
    console.log(`clicked with index=${lineIndex}`);
  }

  function getCurrentIndex() {
    const totalTime = inputRef.current.duration;
    return Math.floor((inputRef.current.currentTime * numChunks) / totalTime);
  }

  return (
    <>
      <Audio ref={inputRef} />
      <Container>
        <TextLines
          getCurrentIndex={getCurrentIndex}
          onClick={setCurrentTime} />
      </Container>
    </>
  );
}