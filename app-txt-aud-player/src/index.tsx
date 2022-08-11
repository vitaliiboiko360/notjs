import ReactAudioPlayer from './player.tsx';
import React, {useState} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';

import readFile from './readFile.ts';

function Container() {
    const [progress, setProgess] = useState(0);
    const [end, setEnd] = useState(100);
    const updateProgress = (newProgress)=>{
        setProgess(newProgress);
    }
    const updateEnd = (newEnd)=>{
        console.log(`updateEnd ${newEnd}`);
        setEnd(newEnd);
    }
    const [currentTime, setCurrentTime] = useState(0);
    const updateCurrentTime = (newCurrentTime) => {
        setCurrentTime(newCurrentTime);
    }

    return (
        <>
        <ReactAudioPlayer
        src="data/threepigs-sp-full-128.mp3"
        currentTime={currentTime}
        updateProgress={updateProgress}
        updateEnd={updateEnd}
        controls
        />
        <TextBox
        textToDisplay={readFile()}
        />
        <PositionSlider
            end={end}
            currentValue={progress}
            updateCurrentTime={updateCurrentTime}
        />
        </>
    );
}

function App() {
    return (
        <Container />
    );
  }

export default App;