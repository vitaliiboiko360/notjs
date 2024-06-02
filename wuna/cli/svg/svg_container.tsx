import React from 'react';

export default function SvgContainer(props) {
  return (<svg width={600} height={600}>{props.children}</svg>);
}