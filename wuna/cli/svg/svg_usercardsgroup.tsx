import React, { useRef } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import UserCards from './svg_usercards.tsx';

function getTransformString(position: number, avatarBox) {
  let retString = '';
  let { x, y, width, height } = avatarBox.getBBox();
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

const UserCardsGroup = React.forwardRef((props, avatarBox) => {

  const transformString = getTransformString(props.position, avatarBox);

  if (props.position == USER_PLACE.BOTTOM_USER) {
    return (<></>);
  }

  let refToGroup = useRef(null);

  return (<g ref={refToGroup} transform={transformString}>
    <UserCards refToGroup={refToGroup} position={props.position} />
  </g>);
});

export default UserCardsGroup;