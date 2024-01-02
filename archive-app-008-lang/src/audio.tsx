import React from 'react';
import { forwardRef } from 'react';

const Audio = forwardRef((props, ref) => {
  return (<audio ref={ref} src="data/threepigs-sp-full-128.mp3" type="audio/mpeg" {...props} ></audio>);
});


export default Audio;