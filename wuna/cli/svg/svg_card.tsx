import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../websocketprovider'

export default function Card(props) {

  const [whichCard, setWhichCard] = useState(0);

  const webSocket = useContext(WebSocketContext);

  React.useEffect(() => {
    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      // console.log(arBuf[0]);
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