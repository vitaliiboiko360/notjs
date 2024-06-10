import React from 'react';

export const SVG_DIMENSIONS = { width: 800, height: 600 };

export default function SvgContainer(props) {
  return (
    <svg
      width={SVG_DIMENSIONS.width}
      height={SVG_DIMENSIONS.height}
    >
      {props.children}
    </svg>
  );
}