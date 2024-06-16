import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../websocketprovider'

export default function SvgCardHolder(props) {

  const [whichCard, setWhichCard] = useState(0);

  const webSocket = useContext(WebSocketContext);

  React.useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      console.log(arBuf[0]);
      setWhichCard(arBuf[0])
    };

    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  if (whichCard > 50) {
    return (<><g xmlns="http://www.w3.org/2000/svg" transform="matrix(4,0,0,4,0,0)" id="g6555">
      <rect width="60" height="90" rx="10" ry="10" x="0" y="0" id="rect2987-1" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: '#000000', strokeWidth: 0.5, strokeMiterlimit: 4, strokeDashArray: 'none' }} />
      <rect width="50" height="80" rx="5" ry="5" x="5" y="5" id="rect3757-5" style={{ fill: '#ff5555', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 45,352.36216 c -22.09139,0 -40,17.90861 -40,40 0,5.52285 4.47715,10 10,10 22.09139,0 40,-17.90861 40,-40 0,-5.52285 -4.47715,-10 -10,-10 z" id="path3773-0-4-8-4-2" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 30,362.36217 c -5.52285,0 -10,4.47715 -10,10 l 0,10 c 0,5.52285 4.47715,10 10,10 5.52285,0 10,-4.47715 10,-10 l 0,-10 c 0,-5.52285 -4.47715,-10 -10,-10 z m 0,5 c 2.76142,0 5,2.23858 5,5 l 0,10 c 0,2.76142 -2.23858,5 -5,5 -2.76142,0 -5,-2.23858 -5,-5 l 0,-10 c 0,-2.76142 2.23858,-5 5,-5 z" id="path3962-7" style={{ fill: '#ff5555', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 12.5,339.86217 c -2.76143,0 -5,2.23857 -5,5 l 0,5 c 0,2.76143 2.23857,5 5,5 2.76142,0 5,-2.23857 5,-5 l 0,-5 c 0,-2.76143 -2.23858,-5 -5,-5 z m 0,2.5 c 1.38071,0 2.5,1.11929 2.5,2.5 l 0,5 c 0,1.38071 -1.11929,2.5 -2.5,2.5 -1.38071,0 -2.5,-1.11929 -2.5,-2.5 l 0,-5 c 0,-1.38071 1.11929,-2.5 2.5,-2.5 z" id="path3962-7-1" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 47.5,399.86217 c -2.76143,0 -5,2.23857 -5,5 l 0,5 c 0,2.76143 2.23857,5 5,5 2.76142,0 5,-2.23857 5,-5 l 0,-5 c 0,-2.76143 -2.23858,-5 -5,-5 z m 0,2.5 c 1.38071,0 2.5,1.11929 2.5,2.5 l 0,5 c 0,1.38071 -1.11929,2.5 -2.5,2.5 -1.38071,0 -2.5,-1.11929 -2.5,-2.5 l 0,-5 c 0,-1.38071 1.11929,-2.5 2.5,-2.5 z" id="path3962-7-1-2" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
    </g></>);
  }
  else if (whichCard < 50 && whichCard > 0) {
    return (<><g xmlns="http://www.w3.org/2000/svg" transform="matrix(4,0,0,4,0,0)" id="g6556">
      <rect width="60" height="90" rx="10" ry="10" x="0" y="0" id="rect2987-1" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: '#000000', strokeWidth: 0.5, strokeMiterlimit: 4, strokeDashArray: 'none' }} />
      <rect width="50" height="80" rx="5" ry="5" x="5" y="5" id="rect3757-5" style={{ fill: '#ffaa00', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 45,352.36216 c -22.09139,0 -40,17.90861 -40,40 0,5.52285 4.47715,10 10,10 22.09139,0 40,-17.90861 40,-40 0,-5.52285 -4.47715,-10 -10,-10 z" id="path3773-0-4-8-4-2" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 30,362.36217 c -5.52285,0 -10,4.47715 -10,10 l 0,10 c 0,5.52285 4.47715,10 10,10 5.52285,0 10,-4.47715 10,-10 l 0,-10 c 0,-5.52285 -4.47715,-10 -10,-10 z m 0,5 c 2.76142,0 5,2.23858 5,5 l 0,10 c 0,2.76142 -2.23858,5 -5,5 -2.76142,0 -5,-2.23858 -5,-5 l 0,-10 c 0,-2.76142 2.23858,-5 5,-5 z" id="path3962-7" style={{ fill: '#ffaa00', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 12.5,339.86217 c -2.76143,0 -5,2.23857 -5,5 l 0,5 c 0,2.76143 2.23857,5 5,5 2.76142,0 5,-2.23857 5,-5 l 0,-5 c 0,-2.76143 -2.23858,-5 -5,-5 z m 0,2.5 c 1.38071,0 2.5,1.11929 2.5,2.5 l 0,5 c 0,1.38071 -1.11929,2.5 -2.5,2.5 -1.38071,0 -2.5,-1.11929 -2.5,-2.5 l 0,-5 c 0,-1.38071 1.11929,-2.5 2.5,-2.5 z" id="path3962-7-1" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
      <path d="m 47.5,399.86217 c -2.76143,0 -5,2.23857 -5,5 l 0,5 c 0,2.76143 2.23857,5 5,5 2.76142,0 5,-2.23857 5,-5 l 0,-5 c 0,-2.76143 -2.23858,-5 -5,-5 z m 0,2.5 c 1.38071,0 2.5,1.11929 2.5,2.5 l 0,5 c 0,1.38071 -1.11929,2.5 -2.5,2.5 -1.38071,0 -2.5,-1.11929 -2.5,-2.5 l 0,-5 c 0,-1.38071 1.11929,-2.5 2.5,-2.5 z" id="path3962-7-1-2" style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none' }} />
    </g></>);
  }
  else {
    return (<></>);
  }
}

function getCardToRender(cardId: number) {
  if (cardId > 50 && cardId <= 100) {
    return <>
      <svg
        width="64.02916mm"
        height="95.779167mm"
        viewBox="0 0 64.02916 95.779167"
        version="1.1"
        id="svg1"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <rect
          width="63.499996"
          height="95.25"
          rx="10.583333"
          ry="10.583333"
          x="0.23478761"
          y="0.28714344"
          id="rect2987"
          style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: '#000000', strokeWidth: 0.529167, strokeMiterlimit: 4, strokeDasharray: 'none' }} />
        <rect
          width="52.916664"
          height="84.666664"
          rx="5.2916665"
          ry="5.2916665"
          x="5.5264544"
          y="5.5788107"
          id="rect3757"
          style="fill:#ff5555;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.05833" />
        <path
          d="m 47.859788,21.453795 c -23.380053,0 -42.3333325,18.953278 -42.3333325,42.333332 0,5.845016 4.7383165,10.583333 10.5833325,10.583333 23.380055,0 42.333333,-18.953278 42.333333,-42.333332 0,-5.845016 -4.738316,-10.583333 -10.583333,-10.583333 z"
          id="path3773-0-4-8-4"
          style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.05833" />
        <path
          d="m 29.868123,32.037128 -5.291667,5.291667 v 6.349999 l 5.291667,-5.291666 v 25.399999 h 5.291666 V 32.037128 Z"
          id="rect3921"
          style="fill:#ff5555;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.05833" />
        <path
          d="M 10.818122,8.2246295 8.1722885,10.870462 v 3.175 l 2.6458335,-2.645833 v 12.699999 h 2.645833 V 8.2246295 Z"
          id="rect3921-5"
          style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.05833" />
        <path
          d="m 53.151455,87.599627 2.645833,-2.64583 v -3.175004 l -2.645833,2.645834 v -12.7 h -2.645833 v 15.875 z"
          id="rect3921-5-5"
          style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.05833" />
      </svg>
    </>
  }

}