import ReactAudioPlayer from './player.tsx';
import React, {useState, useEffect} from 'react';
import PositionSlider from './slider.tsx'
import TextBox from './text_box';
import PlayerButtons from './player_buttons';

import Container from '@mui/material/Container';
import TextContainer from './text_container.ts';
import AutoGridNoWrap from './grid_text.tsx';

let text = new TextContainer();

function TextPlayer() {
    const [progress, setProgess] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isTextLoaded, setTextIsLoaded] = useState(false);
    const [end, setEnd] = useState(100);
    const [isActivePlay, setActivePlay] = useState(false);
    const [isEnded, setEnded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:4001/data/los_tres_cerditos.txt')
            .then((response) => {
                return response.text();
            })
            .then((loadedText)=>{
            if(!isTextLoaded)
                text = new TextContainer(loadedText);
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
        activePlay={isActivePlay}
        setActivePlay={setActivePlay}
        onPlay={(e: Event)=> {
            setActivePlay(true);
            setEnded(false);
        }}
        onEnded={(e: Event)=> {
            setActivePlay(false);
            setEnded(true);
        }}
        onPause={(e: Event)=> setActivePlay(false)}
        onSeeked={(e: Event)=> {
            console.log(e.type);
            setEnded(false);
        }}
        controls
        />
        <PositionSlider
            end={end}
            currentValue={progress}
            updateCurrentTime={setCurrentTime}
        />
        <PlayerButtons
            ended={isEnded}
            setActivePlay={setActivePlay}
        />
        <AutoGridNoWrap
            lines={text.lines}
            scroll={window.pageYOffset}
            setCurrentTime={setCurrentTime}
        />
        </Container>
    );
}

export default TextPlayer;
