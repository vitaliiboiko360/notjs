import React from 'react';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from '../src/index.tsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<ReactAudioPlayer
  src="threepigs-sp-full-128.mp3"
  controls
/>);