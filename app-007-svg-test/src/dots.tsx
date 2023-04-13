import React from 'react';
import {createElement} from 'react';


export default function Dots(props) {
  console.log(`length x=${props.coordinates.x.length} y=${props.coordinates.y.length}`);
  console.log(props.coordinates.x);
  console.log(props.coordinates.y);
  // console.log('dots render');
  const x = props.coordinates.x.length;
  const y = props.coordinates.y.length;
  const xyLength = props.coordinates.x.length * props.coordinates.y.length;
  console.log(`xyLength = ${xyLength}`);
  const dots = Array.apply(null, {length: xyLength}).map((element, index)=>{
    const cx = props.coordinates.x[index % x] - 38;
    const cy = props.coordinates.y[index / y];
    console.log(`x=${cx} y=${cy}`);
    return createElement('circle', {cx:cx, cy:cy, r:8});
  });

  return (
    dots
  );
}

/*

3 x 4
x = 4
y = 3
----
----
----

total = 12

0 1 2 3 4 5 6 7 8 9 10 11

cx = (index % x) 


*/