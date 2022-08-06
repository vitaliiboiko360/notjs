import ReactAudioPlayer from './player.tsx';
import React, {useState} from 'react';
import PositionSlider from './slider.tsx'

function Progress(props) {
    return (
        <p>{props.progress}</p>
    );
}

function Container() {
    const [progress, setProgess] = useState(0);

    const updateProgress = (newProgress)=>{
        setProgess(newProgress);
    }
    return (
        <>
        <ReactAudioPlayer
        src="threepigs-sp-full-128.mp3"
        updateProgress={updateProgress}
        controls
        />
        <Progress progress={progress} />
        <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        />
        <PositionSlider />
        </>
    );
}

function App() {
    return (
        <Container />
    );
  }

export default App;