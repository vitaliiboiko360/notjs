import React, { Fragment } from 'react';

import { getCard } from './svg_getcard';

export default function SvgActivePlayerCards(props) {
  if (props.cardArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  //console.log(`props.cardsArray.length=${props.cardArray.length}`);

  return (<>
    {props.cardArray.slice(0, 15).map((card, index) => {
      const transformString = `translate(${index * 15})`; // 20px -> step to the right on X axe
      return (<Fragment key={index}>
        <g transform={transformString} >
          {getCard(card)}
        </g>
      </Fragment>);
    })}
  </>);
}