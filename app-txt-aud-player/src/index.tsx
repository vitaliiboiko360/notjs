import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';

function Container() {
    const [progress, setProgess] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [text, setText] = useState('');
    const [isTextLoaded, setTextIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:4001/data/threepigs.txt')
            .then((response) => {
                return response.text();
            })
            .then((text)=>{
            if(isTextLoaded)
                console.log('already loaded text');
            else
            setText(text);
            })
            .catch((error)=>{
            console.log(error);
            });
        }
      
        fetchData().catch(console.error);
        setTextIsLoaded(true);
      });

    return (
        <>
        <ReactAudioPlayer
        src="data/threepigs-sp-full-128.mp3"
        currentTime={currentTime}
        updateProgress={setProgess}
        updateEnd={setEnd}
        controls
        />
        <TextBox
        textToDisplay={text}
        />
        <PositionSlider
            currentValue={progress}
            updateCurrentTime={setCurrentTime}
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