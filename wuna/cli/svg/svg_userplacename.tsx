import React, { forwardRef, useEffect, useRef } from 'react';

//import { useAppSelector } from '../store/hooks.ts';

import { USERPLACEHOLDER_DIMS } from './svg_userplaceavatar.tsx';

const UserNameHolder = forwardRef((props, refAvatarBox) => {
  const ref = useRef(null);
  useEffect(() => {
    // if (!refAvatarBox.current) {
    //   console.log('NO REF for user caption comp');
    //   return;
    // }
    // const { x, y, width, height } = refAvatarBox.current.getBBox();

    const tranfromString = `translate(${props.xPosition + (USERPLACEHOLDER_DIMS.width / 2)},${props.yPosition + USERPLACEHOLDER_DIMS.height + 13})`;
    ref.current.setAttribute('transform', tranfromString);
  });
  const textString = `player #${props.position + 1}`;
  return (<>
    <g ref={ref}>
      <text textAnchor="middle">{textString}</text>
    </g>
  </>);
});

export default UserNameHolder;
