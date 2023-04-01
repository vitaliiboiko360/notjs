import {createElement} from 'react';

export default function String(props) {
  const strings = Array.apply(null, {length: 6}).map((element, index)=>{
    const deltaY = index*25;
    const key = index+10;
    const yCoordinate = 238+deltaY;
    props.updateYArray(cordinates => cordinates.concat(yCoordinate));
    return createElement('line', {key:key, x1:0, y1:yCoordinate, x2:800, y2:yCoordinate, stroke: 'black' });
  });
  return (
    strings
  );
}