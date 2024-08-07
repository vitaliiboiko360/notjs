import React, { Fragment } from 'react';

import { getCard, isCardPlayable } from './svg_getcard';

export default function SvgActivePlayerCards(props) {

  if (props.cardArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  //console.log(`props.cardsArray.length=${props.cardArray.length}`);
  let playableCardCounter = 0;
  return (<>
    {props
      .cardArray
      .map((card, index) => {
        let transformString = '';
        const isPlayable = props.isOurTurn && isCardPlayable(card, props.activeCard);
        if (isPlayable) {
          playableCardCounter++;
          transformString = `translate(${(index * 15) - 10},${-40})`;
        } else
          transformString = `translate(${(index * 15) - (10 * playableCardCounter)})`; // 20px -> step to the right on X axe
        return (
          <Fragment key={index}>
            <g transform={transformString} >
              {getCard(card)}
            </g>
          </Fragment>
        );
      })}
  </>);
}