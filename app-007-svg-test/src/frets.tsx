import * as React from 'react';

function createLines() {
  let frets = Array(9).fill(0);
  frets = frets.map((value, index)=>{
    return `<line x1="${(index+1)*80}" y1="220" x2="${(index+1)*80}" y2="380" stroke="black" />`
  });
  return {__html: frets.join('')};
}

export default function Frets() {
  return <g dangerouslySetInnerHTML={createLines()} />;
} 