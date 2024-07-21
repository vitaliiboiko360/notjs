import React, { useState, useContext, useEffect, Fragment } from 'react';

import { getCard1, getCard2, getCard } from './svg_getcard';

export default function SvgActivePlayerCards(props) {
  if (props.cardArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  console.log(`props.cardsArray.length=${props.cardArray.length}`);

  return (<>
    {props.cardArray.map((card, index) => {
      const transformString = `translate(${index * 20})`; // 20px -> step to the right on X axe
      return (<Fragment key={index}>
        <g transform={transformString} >
          {getCard(card)}
        </g>
      </Fragment>);
    })}
  </>);
}