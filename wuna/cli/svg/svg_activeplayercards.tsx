import React, { useState, useContext, useEffect } from 'react';

import { getCard1, getCard2 } from './svg_getcard';

export default function SvgActivePlayerCards(props) {
  if (props.cardsArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  console.log(`props.cardsArray.length=${props.cardsArray.length}`);

  return (<>
    {props.cardsArray.map((card, index) => {
      if (card > 50)
        return getCard1(index * 20);
      return getCard2(index * 20);
    })}
  </>);
}