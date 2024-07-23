import React, { useRef, useEffect, useState } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import UserCards from './svg_usercards.tsx';

function getTransformString(position: number, refAvatarBox) {
  let retString = '';
  let { x, y, width, height } = refAvatarBox.current.getBBox();
  if (position == USER_PLACE.LEFT_USER) {
    retString = `matrix(${-1},0,0,${1},${x + width + 20},${y + (height / 2)})`;
  }
  if (position == USER_PLACE.TOP_USER) {
    retString = `matrix(${-1},0,0,${1},${x + (width / 2)},${y + width + 20})`;
  }
  if (position == USER_PLACE.RIGHT_USER) {
    retString = `matrix(${-1},0,0,${1},${x - 20},${y + (width / 2)})`;
  }
  if (position == USER_PLACE.BOTTOM_USER) {
    // for bottom user
    // if user is active we wouldn't need this group of hiden cards in user's hand
    //retString = `matrix(${-1},0,0,${1},${x - 20},${y + (width / 2)})`;
  }
  return retString;
}

const UserCardsGroup = React.forwardRef((props, refAvatarBox) => {
  const [transfrom, setTransfrom] = useState('');

  if (props.position == USER_PLACE.BOTTOM_USER) {
    return (<></>);
  }

  useEffect(() => {
    if (!refAvatarBox || !refAvatarBox.current) {
      console.log('useEffect no REF!!! props.position=', props.position);
      return;
    }
    console.log('useEffect cards group');
    const transformString = getTransformString(props.position, refAvatarBox);
    setTransfrom(transformString);
  });

  let refToGroup = useRef(null);

  return (<><g ref={refToGroup} transform={transfrom}>
    <UserCards refToGroup={refToGroup} position={props.position} />
  </g></>);
});

export default UserCardsGroup;