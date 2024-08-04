import React from 'react';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

const UserAvatarHolder = React.forwardRef((props, ref) => {
  return (<><rect
    ref={ref}
    x={props.xPosition}
    y={props.yPosition}
    width={USERPLACEHOLDER_DIMS.width}
    height={USERPLACEHOLDER_DIMS.height}
    rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" /></>);
});

export default UserAvatarHolder;