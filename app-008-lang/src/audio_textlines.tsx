import React from 'react';

import Container from '@mui/material/Container';
import TextLines from './text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';

import { Link } from 'react-router-dom';

import {
  useLoaderData,
} from "react-router-dom";

export default function AudioTextLines() {

  // let urlParams = useParams();
  // console.log(urlParams);

  const audioRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);

  const updateStopTimeAudio = function (endTime) {

    if (onTimeUpdateHandler.current) {
      console.log('ref onTimeUpdateHandler is not null');
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
    }

    const onTimeUpdateHandlerNew = () => {
      if (audioRef.current.currentTime >= endTime) {
        audioRef.current.pause();
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandlerNew, false);
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  }

  const onClickUserPlayNewStart = function (seconds, end) {
    updateStopTimeAudio(end);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const data = useLoaderData();

  return (
    <>
      <Link to="/">---Back Home</Link>
      <Container>
        <TextLines
          onClick={onClickUserPlayNewStart} />
        <AudioAndSlider ref={audioRef} audio={data.audio} />
      </Container>
    </>
  );
}