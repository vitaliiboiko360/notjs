import React from 'react';
import Container from '@mui/material/Container';
import { useRef, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Slider from '@mui/material/Slider';

import TextLines from './text_lines.tsx';
import Audio from './audio.tsx';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function AudioTextLines() {
  const theme = useTheme();
  const numChunks = 26; // TODO
  const audioRef = useRef(null);
  const [position, setPosition] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0);

  // const setCurrentTime2 = useCallback((lineIndex) => {
  //   const totalTime = audioRef.current.duration;
  //   console.log(`duration ${totalTime}`);
  //   audioRef.current.currentTime = (totalTime / numChunks) * lineIndex;
  //   audioRef.current.play();

  //   console.log(`set current time to ${(totalTime / numChunks) * lineIndex}`);
  //   console.log(`clicked with index=${lineIndex}`);
  // }, [setPosition]);

  // audioRef.onloadedmetadata = function () {
  //   setTotalTime()
  // };

  useEffect(() => {
    const onLoadedMetadata = (event) => {
      if (audioRef && audioRef.current) {
        setTotalTime(audioRef.current.duration);
        console.log(`onLoadedMetadata duration ${audioRef.current.duration}`);
      }
      else {
        console.log(`onLoadedMetadata audioRef is NULL`);
      }
    }
    if (audioRef && audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata, false);
      return () => {
        audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata, false);
      };
    }
    else {
      console.log(`useEffect audioRef is NULL`);
    }
  }, [audioRef]);

  function setCurrentTime(seconds) {
    // const totalTime = audioRef.current.duration;
    // console.log(`duration ${totalTime}`);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();

    console.log(`onClick with seconds = ${seconds} `);
  }

  function getCurrentIndex() {
    const totalTime = audioRef.current.duration;
    return Math.floor((audioRef.current.currentTime * numChunks) / totalTime);
  }

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft} `;
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
                } `,
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
      <TinyText sx={{
        marginRight: 'auto',
        marginLeft: 0,
        display: 'inline',
        float: 'left'
      }}>{formatDuration(position)}</TinyText>
      <TinyText sx={{
        marginLeft: 'auto',
        marginRight: 0,
        display: 'inline',
        float: 'right'
      }}>{formatDuration(totalTime)}</TinyText>
      <Container>
        <TextLines
          getCurrentIndex={getCurrentIndex}
          onClick={setCurrentTime} />
      </Container>
    </>
  );
}