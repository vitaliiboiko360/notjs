import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';

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

    const [text, setText] = useState('');
    const updateText = (newText) => {
        setText(newText);
    }

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetch('http://localhost:4001/data/threepigs.txt')
          .then((response) => {
            return response.text();
          })
           .then((text)=>{
            console.log(text);
            updateText(text);
           });
        }
      
        fetchData().catch(console.error);
      });

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
        textToDisplay={text}
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