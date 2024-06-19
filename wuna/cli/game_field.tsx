import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipseTable from './svg/svg_ellipse_table';
import SvgUserPlaceHolder, { USER_POSITIONS } from './svg/svg_userplaceholder';
import SvgCardStack from './svg/svg_cardsstack';
import Card from './svg/svg_card';
import SvgActivePlayerCardHolder from './svg/svg_activeplayercardholder';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipseTable />
      <SvgUserPlaceHolder {...USER_POSITIONS['left_user']} />
      <SvgUserPlaceHolder {...USER_POSITIONS['top_user']} />
      <SvgUserPlaceHolder {...USER_POSITIONS['right_user']} />
      <SvgUserPlaceHolder {...USER_POSITIONS['bottom_user']} />
      <SvgCardStack>
        <Card />
      </SvgCardStack>
      <SvgActivePlayerCardHolder />
    </SvgContainer>
  );
}