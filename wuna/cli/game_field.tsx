import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipse from './svg/svg_ellipse';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipse />
    </SvgContainer>
  );
}