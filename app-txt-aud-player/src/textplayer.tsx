import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';
import PlayerButtons from './player_buttons';

import Container from '@mui/material/Container';

let text = '';

function TextPlayer() {
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
            .then((loadedText)=>{
            if(!isTextLoaded)
                text = loadedText;
            })
            .catch((error)=>{
                console.log(error);
            });
        }
      
        fetchData().catch(console.error);
        setTextIsLoaded(true);
      });

    return (
        <Container>
        <ReactAudioPlayer
        src="data/threepigs-sp-full-128.mp3"
        currentTime={currentTime}
        updateProgress={setProgess}
        updateEnd={setEnd}
        controls
        />
        <PositionSlider
            end={end}
            currentValue={progress}
            updateCurrentTime={setCurrentTime}
        />
        <PlayerButtons></PlayerButtons>
        <TextBox
        textToDisplay={text}
        />
        </Container>
    );
}

export default TextPlayer;
