import React from 'react';
import Container from '@mui/material/Container';
import { useRef, useEffect } from 'react';


import TextLines from './text_lines.tsx';
import SliderAudioPlayseek from './slider_audio_playseek.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {
  const audioRef = useRef(null);
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  let endTime = 0;

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
        const totalTime = Math.ceil(audioRef.current.duration);
        setTotalTime(totalTime);
        console.log(`onLoadedMetadata duration ${totalTime}`);
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
  }, [audioRef, endTime]);

  function updateStopTimeAudio() {
    if (!(audioRef && audioRef.current)) {
      console.log(`updateStopTimeAudio audioRef is ${audioRef}`);
      return;
    }

    const onTimeUpdate = (event) => {
      if (audioRef && audioRef.current) {
        //console.log(`onTimeUpdate currentTime ${audioRef.current.currentTime}`);
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(Math.floor(currentTime));
        if (currentTime >= endTime) {
          audioRef.current.pause();
          console.log(`onTimeUpdate paused audio !!!`);
          // setNextTextActive 
        }
      }
      else {
        console.log(`onTimeUpdate audioRef is NULL`);
      }
    }
    audioRef.current.removeEventListener("timeupdate", onTimeUpdate, false);
    audioRef.current.addEventListener("timeupdate", onTimeUpdate, false);
    console.log(`updated Audio timeupdate handler`);
  }

  function onClickPlayNewStart(seconds, end) {
    // const totalTime = audioRef.current.duration;
    // console.log(`duration ${totalTime}`);
    console.log(`END was set = ${end}`);
    endTime = end;
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
    console.log(`onClick with seconds = ${seconds} `);
    updateStopTimeAudio();
  }

  function getCurrentIndex() {
    const totalTime = audioRef.current.duration;
    return Math.floor((audioRef.current.currentTime * numChunks) / totalTime);
  }

  return (
    <>
      <Audio ref={audioRef} />
      <SliderAudioPlayseek
        currentTime={currentTime}
        totalTime={totalTime}
      />
      <Container>
        <TextLines
          getCurrentIndex={getCurrentIndex}
          onClick={onClickPlayNewStart} />
      </Container>
    </>
  );
}