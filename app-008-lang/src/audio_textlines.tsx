import React from 'react';
import Container from '@mui/material/Container';
import { useRef } from 'react';

import TextLines from './text_lines.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {

  const inputRef = useRef(null);

  function setCurrentTime(lineIndex) {
    const numChunks = 26;
    const totalTime = inputRef.current.duration;
    console.log(`duration ${totalTime}`);
    inputRef.current.currentTime = (totalTime / numChunks) * lineIndex;
    inputRef.current.play();

    console.log(`set current time to ${(totalTime / numChunks) * lineIndex}`);
    console.log(`clicked with index=${lineIndex}`);
  }

  return (
    <>
      <Audio ref={inputRef} />
      <Container>
        <TextLines onClick={setCurrentTime} />
      </Container>
    </>
  );
}