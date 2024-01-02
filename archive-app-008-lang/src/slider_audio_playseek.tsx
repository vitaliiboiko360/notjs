import React from 'react';

import Slider from '@mui/material/Slider';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function SliderAudioPlayseek(props) {

  const [position, setPosition] = React.useState(0);

  const theme = useTheme();

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft} `;
  }

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  return (<><Slider
    aria-label="time-indicator"
    size="small"
    value={props.currentTime}
    min={0}
    step={1}
    max={props.totalTime}
    onChange={(_, value) => setPosition(value as number)}
    sx={{
      color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
      height: 4,
      '& .MuiSlider-thumb': {
        width: 8,
        height: 8,
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&:before': {
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
        },
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
            ? 'rgb(255 255 255 / 16%)'
            : 'rgb(0 0 0 / 16%)'
            } `,
        },
        '&.Mui-active': {
          width: 20,
          height: 20,
        },
      },
      '& .MuiSlider-rail': {
        opacity: 0.28,
      },
    }}
  />
    <TinyText sx={{
      marginRight: 'auto',
      marginLeft: 0,
      display: 'inline',
      float: 'left'
    }}>{formatDuration(props.currentTime)}</TinyText>
    <TinyText sx={{
      marginLeft: 'auto',
      marginRight: 0,
      display: 'inline',
      float: 'right'
    }}>{formatDuration(props.totalTime)}</TinyText>
  </>);
}