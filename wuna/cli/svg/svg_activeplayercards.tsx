import React, { useState, useContext, useEffect } from 'react';

import { getCard1, getCard2 } from './svg_getcard';

export default function SvgActivePlayerCards(props) {
  if (props.cardsArray.length == 0) {
    console.log(`init cards state in props`);
    return (<></>);
  }


  return (<></>);
}