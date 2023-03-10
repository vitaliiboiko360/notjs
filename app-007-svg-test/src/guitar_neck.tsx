import * as React from 'react';

export default function GuitarNeck(props) {
  const svg = 
  `<svg width="800" height="600" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <polyline points="0 45 100 55 100 65 0 65" stroke="black" fill="transparent" stroke-width="2"/>
  </svg>`;
  const div = `<div>
    <p>text</p>
  </div>`
  return (<polyline points="0,230 800,210 800,390 0,370 0,230" stroke="black" fill="transparent" stroke-width="2"/>);
}