import React, { fowrwardRef, useEffect, useRef } from 'react';

//import { useAppSelector } from '../store/hooks.ts';

const UserNameHolder = fowrwardRef((props, refAvatarBox) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!refAvatarBox.current) {
      console.log('NO REF for user caption comp');
      return;
    }
    const { x, y, width, height } = refAvatarBox.current.getBBox();
    const tranfromString = `translate(${x - 5},${y + height})`;
    ref.addAttirubute('transfrom', tranfromString);
  });

  return (<>
    <g ref={ref}>
      <text>{`player #${props.position}`}</text>
    </g>
  </>);
});

export default UserNameHolder;
