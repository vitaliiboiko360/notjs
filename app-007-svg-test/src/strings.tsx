import {createElement} from 'react';

export default function String() {
  const strings = Array.apply(null, {length: 6}).map((element, index)=>{
    const deltaY = index*25;
    return createElement('line', {x1:0, y1:238+deltaY, x2:800, y2:238+deltaY, stroke: 'black' });
  });
  return (
    strings
  );
}