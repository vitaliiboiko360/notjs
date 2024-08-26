import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipseTable from './svg/svg_ellipse_table';
import SvgUserPlaceHolder, { USER_POSITIONS, USER_PLACE } from './svg/svg_userplaceholder';
import SvgCardStack, { SvgCardPaths } from './svg/svg_cardsstack';
import SvgActivePlayerCardHolder from './svg/svg_activeplayercardholder';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipseTable />
      <SvgUserPlaceHolder {...USER_POSITIONS[USER_PLACE.LEFT_USER]} />
      <SvgUserPlaceHolder {...USER_POSITIONS[USER_PLACE.TOP_USER]} />
      <SvgUserPlaceHolder {...USER_POSITIONS[USER_PLACE.RIGHT_USER]} />
      <SvgUserPlaceHolder {...USER_POSITIONS[USER_PLACE.BOTTOM_USER]} />
      <SvgCardPaths />
      <SvgCardStack />
      <SvgActivePlayerCardHolder />
    </SvgContainer>
  );
}