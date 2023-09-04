import React from 'react';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';

import Slider from '@mui/material/Slider';

import TextLines from './text_lines.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {
  const theme = useTheme();
  const numChunks = 26; // TODO
  const audioRef = useRef(null);
  const [position, setPosition] = React.useState(32);

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
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={100}
        onChange={(_, value) => setPosition(value as number)}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                ? 'rgb(255 255 255 / 16%)'
                : 'rgb(0 0 0 / 16%)'
                }`,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <Container>
        <TextLines
          getCurrentIndex={getCurrentIndex}
          onClick={setCurrentTime} />
      </Container>
    </>
  );
}