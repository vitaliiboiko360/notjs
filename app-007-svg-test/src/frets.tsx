import * as React from 'react';

const numberFrets = 9;

function createLines(updateXArray) {
  let frets = Array(numberFrets).fill(0);
  frets = frets.map((value, index)=>{
    const xCordinate = (index+1)*80;
    updateXArray(cordinates => cordinates.concat(xCordinate));
    return `<line key=${index+100} x1="${xCordinate}" y1="220" x2="${xCordinate}" y2="380" stroke="black" />`
  });
  return {__html: frets.join('')};
}

export default function Frets(props) {
  return <g dangerouslySetInnerHTML={createLines(props.updateXArray)} />;
} 