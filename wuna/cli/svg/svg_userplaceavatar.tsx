import React, { useRef, useContext, useEffect, useCallback, useImperativeHandle } from 'react';

import { WebSocketContext } from '../websocketprovider.tsx';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { selectPlayerSeatRequested, updatePlayerSeatRequested } from '../store/playerSeatRequested.ts';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

const UserAvatar = React.forwardRef((props, ref) => {
  const refRect = useRef(null);

  const webSocket = useContext(WebSocketContext);
  const playerSeatNumberRequested = useAppSelector(selectPlayerSeatRequested);
  const dispatch = useAppDispatch();

  const seatNumber = props.position + 1;

  let onClick;
  onClick = useCallback((event) => {
    if (playerSeatNumberRequested != 0) {
      //console.log('ONCLICK: clicked on seat=', seatNumber);
      return;
    }
    dispatch(updatePlayerSeatRequested(seatNumber));
    let arrayToSend: Uint8Array = new Uint8Array(1);
    arrayToSend[0] = seatNumber;
    webSocket.send(arrayToSend);
  }, [playerSeatNumberRequested]);

  // useImperativeHandle(ref, () => {
  //   return {
  //     click() {
  //       refRect.current.click();
  //     }
  //   }
  // }, [onClick]);

  useEffect(() => {

    const nodeForRef = refRect.current;

    if (!nodeForRef)
      return;

    if (playerSeatNumberRequested != seatNumber &&
      playerSeatNumberRequested != 0
    ) {
      //console.log('removing click on seat position=', props.position + 1);
      nodeForRef.removeEventListener('click', onClick);
      return;
    }

    // if (playerSeatNumberRequested != 0) {
    //   console.log('someone clicked on seat=', seatNumber);
    // }

    nodeForRef.addEventListener('click', onClick);

    return () => nodeForRef.removeEventListener('click', onClick);
  }, [onClick]);

  return (<><rect
    ref={(node) => {
      refRect.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }}
    x={props.xPosition}
    y={props.yPosition}
    width={USERPLACEHOLDER_DIMS.width}
    height={USERPLACEHOLDER_DIMS.height}
    rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" /></>);
});

export default UserAvatar;