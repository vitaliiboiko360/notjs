import React from 'react'
import { forwardRef } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import SpeedIcon from '@mui/icons-material/Speed';

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);

  const handleChange = (event: SelectChangeEvent) => {
    setPlaybackSpeed(event.target.value);
    ref.current.playbackRate = event.target.value;
  };

  const values = [1.0, 0.85, 0.7];
  return (
    <>
      <div>
        <SpeedIcon>Playback Speed</SpeedIcon>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 60 }}>
          <Select
            value={playbackSpeed}
            onChange={handleChange}
          >
            {values.map((value) => {
              if (value != playbackSpeed)
                return <MenuItem value={value}>{value}</MenuItem>
              return <MenuItem sx={{ display: 'none' }} value={value}>{value}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div >
    </>
  )
});

export default PlaybackRateDropdown;