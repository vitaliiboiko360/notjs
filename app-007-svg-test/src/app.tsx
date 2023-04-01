import * as React from 'react';
const useState = React.useState;
import Neck from './neck.tsx';
import Frets from './frets.tsx';
import Svg from './svg.tsx';
import Strings from './strings.tsx';
import Buttons from './buttons.tsx';
import Dots from './dots.tsx';

function App() {
  function onClick() {
    console.log('click');
  }

  const [yArray, updateYArray] = useState([]);
  const [xArray, updateXArray] = useState([]);
  return (
  <>
  <Buttons onClick={onClick} />
  <Svg>
    <Neck />
    <Frets updateXArray={updateXArray} />
    <Strings updateYArray={updateYArray} />
    <Dots displayAll={true} y={yArray} x={xArray} />
  </Svg>
  </>
  );
}

export default App;