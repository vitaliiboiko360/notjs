import * as React from 'react';

export default function Svg(props) {
  return (<svg width="800" height="600">
    {props.children}
  </svg>);
}