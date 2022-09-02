import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';

function Container() {
    const [progress, setProgess] = useState(0);
    const [end, setEnd] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [text, setText] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let gotResult = false;
            await fetch('http://localhost:4001/data/threepigs.txt')
            .then((response) => {
                return response.text();
            })
            .then((text)=>{
            if(isLoaded)
                console.log('already loaded text');
            else
            setText(text);
            })
            .catch((error)=>{
            console.log(error);
            });
        }
      
        fetchData().catch(console.error);
        setIsLoaded(true);
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
            end={end}
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