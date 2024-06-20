import React, { useState, useContext, useEffect, Fragment } from 'react';

import { getCard1, getCard2 } from './svg_getcard';

export default function SvgActivePlayerCards(props) {
  if (props.cardArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  console.log(`props.cardsArray.length=${props.cardArray.length}`);

  return (<>
    {props.cardArray.map((card, index) => {
      return (<Fragment key={index}>
        {(card > 50) ? getCard1(index * 20) : getCard2(index * 20)}
      </Fragment>);
    })}
  </>);
}