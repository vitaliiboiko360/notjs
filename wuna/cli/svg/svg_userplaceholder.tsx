import React, { useEffect } from 'react';

import UserCardsGroup from './svg_usercardsgroup.tsx';
import UserAvatarHolder from './svg_userplaceavatarholder.tsx';

export default function SvgUserPlaceHolder(props) {
  let ref = React.useRef(null);
  return (<>
    <UserAvatarHolder
      xPosition={props.xPosition}
      yPosition={props.yPosition}
      position={props.position}
      ref={ref} />
    <UserCardsGroup
      position={props.position}
      refAvatarBox={ref} />
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


