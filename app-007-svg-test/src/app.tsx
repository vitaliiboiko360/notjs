import * as React from 'react';
import Neck from './neck.tsx';
import Frets from './frets.tsx';
import Svg from './svg.tsx';
import Strings from './strings.tsx';

function App() {
  return (
  <Svg>
    <Neck />
    <Frets />
    <Strings />
  </Svg>
  );
}

export default App;