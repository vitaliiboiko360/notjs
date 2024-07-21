import React from 'react';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

import UserCards from './svg_usercards';

const UserAvatar = React.forwardRef((props, ref) => {
  return (<rect
    ref={ref}
    x={props.xPosition}
    y={props.yPosition}
    width={USERPLACEHOLDER_DIMS.width}
    height={USERPLACEHOLDER_DIMS.height}
    rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" />);
});

export default function SvgUserPlaceHolder(props) {
  let ref = React.useRef(null);
  return (<>
    <UserAvatar
      xPosition={props.xPosition}
      yPosition={props.yPosition}
      ref={ref} />
    <UserCards
      position={props.position}
      ref={ref} />
  </>);
}

export const enum USER_PLACE {
  LEFT_USER = 0,
  TOP_USER,
  RIGHT_USER,
  BOTTOM_USER
}

export const USER_POSITIONS = [
  {
    position: USER_PLACE.LEFT_USER,
    xPosition: 5,
    yPosition: 250
  },
  {
    position: USER_PLACE.TOP_USER,
    xPosition: 400,
    yPosition: 55
  },
  {
    position: USER_PLACE.RIGHT_USER,
    xPosition: 715,
    yPosition: 270
  },
  {
    position: USER_PLACE.BOTTOM_USER,
    xPosition: 330,
    yPosition: 465
  }
];


