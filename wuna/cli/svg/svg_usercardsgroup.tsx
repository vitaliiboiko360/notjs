import React from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import UserCards from './svg_usercards.tsx';

function getTransformString(position: number, avatarBox) {
  let retString = '';
  let { x, y, width, height } = avatarBox.getBBox();
  if (position == USER_PLACE.LEFT_USER) {
    retString = `matrix(${-1},0,0,${1},${50},${400})`;
  }
  return retString;
}

const UserCardsGroup = React.forwardRef((props, avatarBox) => {
  const transformString = getTransformString(props.position, avatarBox);
  return (<g transform={transformString}>
    <UserCards />
  </g>);
});

export default UserCardsGroup;