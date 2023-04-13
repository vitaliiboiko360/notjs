import * as React from 'react';
import Neck from './neck.tsx';
import Frets from './frets.tsx';
import Svg from './svg.tsx';
import Strings from './strings.tsx';
import Buttons from './buttons.tsx';
import Dots from './dots.tsx';

function App() {
  let displayAll = false;
  function onClick() {
    displayAll = !displayAll;
    console.log(`displayAll=${displayAll}`);
  }
  let coordinates = {x:[], y:[]};
  return (
  <>
  <Buttons onClick={onClick} />
  <Svg>
    <Neck />
    <Frets coordinates={coordinates} />
    <Strings coordinates={coordinates} />
    <Dots displayAll={displayAll} coordinates={coordinates} />
  </Svg>
  </>
  );
}

export default App;