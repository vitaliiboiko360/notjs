import React from 'react';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

export default function SvgUserPlaceHolder(props) {

  let ref = React.useRef(null);


  return (<rect
    ref={ref}
    x={props.xPosition}
    y={props.yPosition}
    width={USERPLACEHOLDER_DIMS.width}
    height={USERPLACEHOLDER_DIMS.height}
    rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" />);
}

export const USER_POSITIONS = {
  "left_user": {
    xPosition: 5,
    yPosition: 250
  },
  "top_user": {
    xPosition: 400,
    yPosition: 55
  },
  "right_user": {
    xPosition: 715,
    yPosition: 270
  },
  "bottom_user": {
    xPosition: 330,
    yPosition: 465
  }
}


