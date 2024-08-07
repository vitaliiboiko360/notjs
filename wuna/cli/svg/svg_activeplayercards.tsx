import React, { Fragment } from 'react';

import { getCard, isCardPlayable } from './svg_getcard';

export default function SvgActivePlayerCards(props) {

  const [activeCard, isOurTurn, cardArray] = props;

  if (cardArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }

  //console.log(`props.cardsArray.length=${props.cardArray.length}`);
  let counterPlayableCards = 0;
  return (<>
    {cardArray
      .map((card, index) => {
        let transformString = '';
        const isPlayable = isOurTurn && isCardPlayable(card, activeCard);
        if (isPlayable) {
          transformString = `translate(${(index * 15) - 10},${-40})`;
          counterPlayableCards++;
        } else
          transformString = `translate(${(index * 15) - (10 * counterPlayableCards)})`; // 20px -> step to the right on X axe
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