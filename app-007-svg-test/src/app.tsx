import * as React from 'react';
import Neck from './neck.tsx';
import Frets from './frets.tsx'
import Svg from './svg.tsx'

function App() {
  return (
  <Svg>
    <Neck />
    <Frets />
  </Svg>
  );
}

export default App;