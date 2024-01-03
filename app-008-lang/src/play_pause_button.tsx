import React from 'react'
import { forwardRef } from 'react';

import IconButton from '@mui/material/IconButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

const PlayPauseButton = forwardRef((props, ref) => {

  const [paused, setPaused] = React.useState(false);

  return (
    <div style={{ float: 'left', clear: 'none' }}>
      <IconButton
        aria-label={paused ? 'play' : 'pause'}
        sx={{ mx: 1 }}
        onClick={() => {
          setPaused((val) => !val);
          if (paused) {
            ref.current.pause();
          } else {
            ref.current.play();
          }
        }
        }
      >
        {paused ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
      </IconButton>
    </div >
  )
});

export default PlayPauseButton;