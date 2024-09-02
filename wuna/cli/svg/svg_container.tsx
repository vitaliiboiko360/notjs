import React, { createContext, useRef } from 'react';

export const SVG_DIMENSIONS = { width: 800, height: 600 };

export const SvgContext = createContext(null);

export default function SvgContainer(props) {
  const refSvg = useRef(null)
  return (
    <SvgContext.Provider value={refSvg}>
      <svg
        ref={refSvg}
        width={SVG_DIMENSIONS.width}
        height={SVG_DIMENSIONS.height}
      >
        {props.children}
      </svg>
    </SvgContext.Provider>
  );
}