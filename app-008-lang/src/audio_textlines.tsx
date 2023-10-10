import React from 'react';

import Container from '@mui/material/Container';
import TextLines from './text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';

export default function AudioTextLines() {

  const audioRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);

  const updateStopTimeAudio = React.useCallback((endTime) => {

    if (onTimeUpdateHandler.current) {
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
    }

    const onTimeUpdateHandlerNew = () => {
      const currentTime = audioRef.current.currentTime;

      if (currentTime >= endTime) {
        audioRef.current.pause();
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandlerNew, false);
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  }, []);

  const onClickUserPlayNewStart = React.useCallback((seconds, end) => {

    //console.log(`END was set = ${end}`);
    updateStopTimeAudio(end);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  }, []);

  return (
    <>
      <AudioAndSlider ref={audioRef} />
      <Container>
        <TextLines
          onClick={onClickUserPlayNewStart} />
      </Container>
    </>
  );
}