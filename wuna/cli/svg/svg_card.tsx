import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import { WebSocketContext } from '../websocketprovider';
import { getCard1, getCard2, getCard_2 } from './svg_getcard';

import { renderToString } from 'react-dom/server';

const Card = forwardRef((props, svgCardStack_ref) => {
  const [whichCard, setWhichCard] = useState(-1);

  const webSocket = useContext(WebSocketContext);
  useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      setWhichCard(arBuf[0]);
    };

    if (svgCardStack_ref.current == null) {
      console.log(`svg element isn't ready yet`);
      return;
    }

    webSocket.addEventListener("message", onMessage);

    return () => webSocket.removeEventListener("message", onMessage);
  });

  if (whichCard == -1) {
    console.log(`initial state`);
    return (<></>);
  }

  let angle = Math.random() * 100 % 15;
  // if (whichCard > 50) {
  //   let element = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  //   element.setAttribute("y", "125");
  //   element.setAttribute("x", "175");
  //   const rotateString = `rotate(${angle}, 45, 30)`;
  //   element.innerHTML = renderToString(<g transform={rotateString} >{getCard1()}</g>);
  //   svgCardStack_ref.current.appendChild(element);
  // } else {
  //   let element = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  //   element.setAttribute("y", "125");
  //   element.setAttribute("x", "175");
  //   const rotateString = `rotate(${angle}, 45, 30)`;
  //   element.innerHTML = renderToString(<g transform={rotateString} >{getCard2()}</g>);
  //   svgCardStack_ref.current.appendChild(element);
  // }
  if (whichCard > 50) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    element.setAttribute('transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)'); // matrix(0, 0, 0, 0, 0, 0)
    element.innerHTML = renderToString(getCard_2());
    svgCardStack_ref.current.appendChild(element);
  } else {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    element.setAttribute('transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)');
    element.innerHTML = renderToString(getCard_2());
    svgCardStack_ref.current.appendChild(element);
  }

  return (<></>);
});

export default Card;