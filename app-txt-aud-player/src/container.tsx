import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';
import TextContainer from './text_container.ts';

let textContainer = new TextContainer('');

function Container() {
    const [progress, setProgess] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isTextLoaded, setTextIsLoaded] = useState(false);
    const [end, setEnd] = useState(100);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:4001/data/los_tres_cerditos.txt')
            .then((response) => {
                return response.text();
            })
            .then((text)=>{
            if(!isTextLoaded)
                textContainer = new TextContainer(text);
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
        textToDisplay={textContainer.getTextBlock(progress*100/end)}
        />
        <PositionSlider
            end={end}
            currentValue={progress}
            updateCurrentTime={setCurrentTime}
        />
        </>
    );
}

export default Container;
