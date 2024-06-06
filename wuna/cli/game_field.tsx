import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipseTable from './svg/svg_ellipse_table';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipseTable />
    </SvgContainer>
  );
}