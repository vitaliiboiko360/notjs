import ReactAudioPlayer from './player.tsx';
import React, {useState} from 'react';
import PositionSlider from './slider.tsx'


function Container() {
    const [progress, setProgess] = useState(0);
    const [e, setEnd] = useState(100);
    const updateProgress = (newProgress)=>{
        setProgess(newProgress);
    }
    const updateEnd = (newEnd)=>{
        console.log(`updateEnd ${newEnd}`);
        setEnd(newEnd);
    }
    return (
        <>
        <ReactAudioPlayer
        src="threepigs-sp-full-128.mp3"
        updateProgress={updateProgress}
        updateEnd={updateEnd}
        controls
        />
        <PositionSlider
            start={0}
            end={e}
            currentValue={progress}
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