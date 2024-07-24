import React, { useRef, useEffect, useState } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import UserCards from './svg_usercards.tsx';

function getTransformString(position: number, refAvatarBox) {
  let retString = '';
  // let { x, y, width, height } = refAvatarBox.current.getBBox();
  if (position == USER_PLACE.LEFT_USER) {
    // matrix(0,-1,1,0,100,370)
    retString = `matrix(0,-1,1,0,65,370)`;
  }
  if (position == USER_PLACE.TOP_USER) {
    retString = `matrix(1,0,0,1,360,90)`;
  }
  if (position == USER_PLACE.RIGHT_USER) {
    retString = `matrix(0,1,-1,0,740,220)`;
  }
  if (position == USER_PLACE.BOTTOM_USER) {
    // for bottom user
    // if user is active we wouldn't need this group of hiden cards in user's hand
    //retString = `matrix(${-1},0,0,${1},${x - 20},${y + (width / 2)})`;
  }
  return retString;
}

const UserCardsGroup = React.forwardRef((props, refAvatarBox) => {
  const [transform, setTransform] = useState('');

  if (props.position == USER_PLACE.BOTTOM_USER) {
    return (<></>);
  }

  useEffect(() => {
    if (!refAvatarBox || !refAvatarBox.current) {
      console.log('useEffect no REF!!! props.position=', props.position);
      return;
    }
    console.log('!!!!!! useEffect cards group');
    const transformString = getTransformString(props.position, refAvatarBox);
    setTransform(transformString);
  });

  let refToGroup = useRef(null);

  return (<><g ref={refToGroup} transform={getTransformString(props.position, refAvatarBox)}>
    <UserCards refToGroup={refToGroup} position={props.position} />
  </g></>);
});

export default UserCardsGroup;