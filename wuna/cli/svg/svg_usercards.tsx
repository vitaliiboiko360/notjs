
import React, { forwardRef } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import { useAppSelector } from '../store/hooks.ts';
import { selectLeftUserCardsNumber } from '../store/leftUserCardsNumber.ts';
import { selectTopUserCardsNumber } from '../store/topUserCardsNumber.ts';
import { selectRightUserCardsNumber } from '../store/rightUserCardsNumber.ts';

import { getCard, COLOR_OFFSETS, BLACK_VALUES } from './svg_getcard.tsx';

const blackBackCardId = COLOR_OFFSETS.BLACK_OFFSET + BLACK_VALUES.BACK_BLACK;

const UserCards = forwardRef((props, refToGroup) => {

  let userCardsNumber;
  if (props.position == USER_PLACE.LEFT_USER) {
    userCardsNumber = useAppSelector(selectLeftUserCardsNumber);
  }
  if (props.position == USER_PLACE.TOP_USER) {
    userCardsNumber = useAppSelector(selectTopUserCardsNumber);
  }
  if (props.position == USER_PLACE.RIGHT_USER) {
    userCardsNumber = useAppSelector(selectRightUserCardsNumber);
  }
  // console.log(`props.postion=${props.position} userCardsNumber=`, userCardsNumber);

  let elements = Array.apply(null, { length: userCardsNumber })
    .map(Number.call, Number)
    .slice(0, 10)
    .map((index) => {
      if (isNaN(index))
        return;

      let transformString = '';
      if (props.position == USER_PLACE.LEFT_USER
        || props.position == USER_PLACE.RIGHT_USER
      ) {
        transformString = `translate(${index * 10})`;
      } else if (props.position == USER_PLACE.TOP_USER
        || props.position == USER_PLACE.BOTTOM_USER
      ) {
        transformString = `translate(${index * 10})`;
      }

      return (<g key={index + ((props.position >= 0 ? props.position + 1 : 1) * 25)} transform={transformString}>
        {getCard(blackBackCardId)}
      </g>);
    })
  return (<>
    {elements}
  </>);
});

export default UserCards;