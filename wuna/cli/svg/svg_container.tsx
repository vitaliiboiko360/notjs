import React from 'react';

export default function SvgContainer(props) {
  return (<svg width={800} height={600}>{props.children}</svg>);
}