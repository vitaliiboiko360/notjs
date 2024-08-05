import React, { useContext, useEffect } from 'react';

import { WebSocketContext } from '../websocketprovider.tsx';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { selectPlayerSeatRequested, updatePlayerSeatRequested } from '../store/playerSeatRequested.ts';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

const UserAvatar = React.forwardRef((props, ref) => {
  const webSocket = useContext(WebSocketContext);
  const playerSeatNumberRequested = useAppSelector(selectPlayerSeatRequested);
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (playerSeatNumberRequested != props.position &&
      playerSeatNumberRequested != 0
    ) {
      return;
    }

    if (playerSeatNumberRequested != 0) {
      console.log('someone clicked on seat=', props.position);
      return;
    }

    const onClick = (event) => {
      if (playerSeatNumberRequested != 0) {
        console.log('ONCLICK: someone clicked on seat=', props.position);
        return;
      }
      dispatch(updatePlayerSeatRequested(props.position));
      let arrayToSend: Uint8Array = new Uint8Array(1);
      arrayToSend[0] = props.position + 1;
      webSocket.send(arrayToSend);
    };

    ref.current.addEventListener('click', onClick);

    return () => ref.current.removeEvenetListener('click', onClick);
  }, [webSocket]);

  return (<><rect
    ref={ref}
    x={props.xPosition}
    y={props.yPosition}
    width={USERPLACEHOLDER_DIMS.width}
    height={USERPLACEHOLDER_DIMS.height}
    rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" /></>);
});

export default UserAvatar;