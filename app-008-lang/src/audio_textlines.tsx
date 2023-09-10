import React from 'react';
import Container from '@mui/material/Container';
import { useState, useRef, useEffect } from 'react';


import TextLines from './text_lines.tsx';
import SliderAudioPlayseek from './slider_audio_playseek.tsx';
import Audio from './audio.tsx';

export default function AudioTextLines() {
  const audioRef = useRef(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const onTimeUpdateHandler = useRef(null);

  const setNextTextToActive = () => {
    console.log(`setNextTextToActive`);
  }

  useEffect(() => {
    if (!(audioRef && audioRef.current))
      return;

    const onLoadedMetadata = (event) => {
      const totalTime = Math.ceil(audioRef.current.duration);
      setTotalTime(totalTime);
    }

    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata, false);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata, false);
    };
  }, [audioRef]);

  function updateStopTimeAudio(endTime, callback) {
    // updateStopTimeAudio
    if (!(audioRef && audioRef.current)) {
      console.log(`updateStopTimeAudio audioRef is ${audioRef}`);
      return;
    }

    if (onTimeUpdateHandler.current) {
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
    }

    const onTimeUpdateHandlerNew = (event) => {
      if (!(audioRef && audioRef.current))
        return;
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(Math.floor(currentTime));
      if (currentTime >= endTime) {
        audioRef.current.pause();
        setTimeout(callback, 500);
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandlerNew, false);
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  }

  function onClickUserPlayNewStart(seconds, end, callback) {
    // const totalTime = audioRef.current.duration;
    // console.log(`duration ${totalTime}`);
    console.log(`END was set = ${end}`);
    updateStopTimeAudio(end, callback);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
    //console.log(`onClick with seconds = ${seconds} `);
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
          onClick={onClickUserPlayNewStart} />
      </Container>
    </>
  );
}