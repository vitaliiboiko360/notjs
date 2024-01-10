import React from 'react';

import SliderAudioPlayseek from './slider_audio_playseek.tsx';
import Audio from './audio.tsx';
import PlayPauseButton from './play_pause_button.tsx'

import { toFixed } from './util.ts'

const AudioAndSlider = React.forwardRef((props, audioRef) => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const onLoadedMetadata = () => {
      const totalTime = toFixed(audioRef.current.duration, 2);
      setTotalTime(totalTime);
    }

    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata, false);

    return () => {
      if (!audioRef.current)
        return;
      audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata, false);
    };
  }, []);

  React.useEffect(() => {

    const onTimeUpdateHandler = () => {
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(toFixed(currentTime, 2));
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandler, false);

    return () => {
      if (!audioRef.current)
        return;
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler, false);
    };
  }, []);

  return (<>
    <Audio ref={audioRef} {...props} />
    <PlayPauseButton
      ref={audioRef}
    />
    <SliderAudioPlayseek
      ref={audioRef}
      currentTime={currentTime}
      totalTime={totalTime}
    />
  </>);
});

export default AudioAndSlider;
