import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const boxShadow =
'0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: boxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: boxShadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

const marks = [
  {
    value: 0,
  },
  {
    value: 100,
  },
];

export default function PositionSlider(props) {
  const end = props.end || 100;
  console.log(`end ${end}`)

  const onChange = (event: Event, value: number | Array<number>, activeThumb: number) => {
    props.updateCurrentTime(value);
  }

  const formatLabelValue = (x: number)=>{
    const numMinutes = Math.floor(x / 60);
    const numSeconds = Math.floor(x % 60);
    //console.log(`numMinutes ${numMinutes} numSeconds ${numSeconds}`);
    return `${numMinutes}:${numSeconds < 10 ? '0'+numSeconds : numSeconds}`;
  }

  return (
    <Box sx={{ width: 680 }}>
      <CustomSlider
        aria-label="playback slider"
        defaultValue={0}
        max={end}
        valueLabelFormat={formatLabelValue}
        value={props.currentValue}
        valueLabelDisplay="on"
        onChange={onChange}
      />
      <Typography gutterBottom></Typography>
    </Box>
  );
}