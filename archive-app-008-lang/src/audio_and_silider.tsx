import React from 'react';

import SliderAudioPlayseek from './slider_audio_playseek.tsx';
import Audio from './audio.tsx';

const AudioAndSlider = React.forwardRef((props, audioRef) => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {

    const onLoadedMetadata = () => {
      const totalTime = Math.ceil(audioRef.current.duration);
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
      setCurrentTime(Math.floor(currentTime));
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
    <SliderAudioPlayseek
      currentTime={currentTime}
      totalTime={totalTime}
    />
  </>);
});

export default AudioAndSlider;
