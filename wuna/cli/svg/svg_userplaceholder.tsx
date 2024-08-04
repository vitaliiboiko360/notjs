import React, { useEffect, useContext } from 'react';

import UserCardsGroup from './svg_usercardsgroup.tsx';
import UserAvatarHolder from './svg_userplaceavatarholder.tsx';

import { WebSocketContext } from '../websocketprovider.tsx';

export default function SvgUserPlaceHolder(props) {
  let ref = React.useRef(null);
  const webSocket = useContext(WebSocketContext);

  useEffect(() => {
    const onClick = (event) => {
      let arrayToSend: Uint8Array = new Uint8Array(1);
      arrayToSend[0] = props.position;
      webSocket.send();
    };

    ref.addEventListener('click', onClick);

    return () => ref.removeEvenetListener('click', onClick);
  }, [webSocket]);

  return (<>
    <UserAvatarHolder
      xPosition={props.xPosition}
      yPosition={props.yPosition}
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


