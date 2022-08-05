import ReactAudioPlayer from './player.tsx';
import React, {useState} from 'react';

function Progress(props) {
    return (
        <p>{props.progress}</p>
    );
}

function Container() {
    const [progress, setProgess] = useState(0);

    const updateProgress = (newProgress)=>{
        console.log('new progress so far {newProgress}');
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
        </>
    );
}

function App() {
    return (
        <Container />
    );
  }

export default App;