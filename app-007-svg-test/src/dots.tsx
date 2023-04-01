import * as React from 'react';

export default function Dots(props) {
  console.log(`length x=${props.x.length} y=${props.y.length}`);
  // console.log('dots render');
  return (
    <svg>
      <circle cx="250" cy="250" r="8" />
    </svg>
  );
}