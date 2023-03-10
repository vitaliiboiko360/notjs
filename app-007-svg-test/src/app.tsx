import * as React from 'react';
import GuitarNeck from './guitar_neck.tsx';
import Frets from './frets.tsx'
import Svg from './svg.tsx'

function App() {
  return (
  <Svg>
    <GuitarNeck />
    <Frets />
  </Svg>
  );
}

export default App;