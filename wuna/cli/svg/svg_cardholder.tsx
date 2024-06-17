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

function getCard1() {
  return (<>
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
        style={{ fill: '#ff5555', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
      <path
        d="m 47.859788,21.453795 c -23.380053,0 -42.3333325,18.953278 -42.3333325,42.333332 0,5.845016 4.7383165,10.583333 10.5833325,10.583333 23.380055,0 42.333333,-18.953278 42.333333,-42.333332 0,-5.845016 -4.738316,-10.583333 -10.583333,-10.583333 z"
        id="path3773-0-4-8-4"
        style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
      <path
        d="m 29.868123,32.037128 -5.291667,5.291667 v 6.349999 l 5.291667,-5.291666 v 25.399999 h 5.291666 V 32.037128 Z"
        id="rect3921"
        style={{ fill: '#ff5555', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
      <path
        d="M 10.818122,8.2246295 8.1722885,10.870462 v 3.175 l 2.6458335,-2.645833 v 12.699999 h 2.645833 V 8.2246295 Z"
        id="rect3921-5"
        style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
      <path
        d="m 53.151455,87.599627 2.645833,-2.64583 v -3.175004 l -2.645833,2.645834 v -12.7 h -2.645833 v 15.875 z"
        id="rect3921-5-5"
        style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
    </svg>
  </>);
}

function getCard2() {
  return (
    <>
      <svg
        width="64.02916mm"
        height="95.779167mm"
        viewBox="0 0 64.02916 95.779167"
        version="1.1"
        id="svg2"
        xmlns:svg="http://www.w3.org/2000/svg">
        <rect
          width="63.499996"
          height="95.25"
          rx="10.583333"
          ry="10.583333"
          x="0.26458251"
          y="0.26455173"
          id="rect2987-8"
          style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: '#000000', strokeWidth: 0.529167, strokeMiterlimit: 4, strokeDasharray: 'none' }} />
        <rect
          width="52.916664"
          height="84.666664"
          rx="5.2916665"
          ry="5.2916665"
          x="5.5562444"
          y="5.5562158"
          id="rect3757-26"
          style={{ fill: '#ff5555', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
        <path
          d="m 47.889594,21.431199 c -23.38006,0 -42.3333402,18.953278 -42.3333402,42.333278 0,5.844987 4.7383132,10.58327 10.5833292,10.58327 23.380066,0 42.333345,-18.953172 42.333345,-42.333215 0,-5.845016 -4.738317,-10.583333 -10.583334,-10.583333 z"
          id="path3773-0-4-8-4-60"
          style={{ fill: '#ffffff', fillOpacity: 1, fillRule: 'evenodd', stroke: 'none', strokeWidth: 1.05833 }} />
        <path
          d="m 30.956258,32.014543 c -5.86317,0 -10.583339,4.720156 -10.583339,10.583322 v 1.058333 h 5.29167 v -1.058333 c 0,-2.931583 2.360085,-5.291666 5.291669,-5.291666 2.931585,0 5.29167,2.360083 5.29167,5.291666 0,1.193271 -0.990082,3.534992 -2.024011,4.348713 -5.61426,4.418478 -5.554993,3.688757 -13.850998,9.409611 v 7.408288 h 10.583339 10.583337 v -5.29164 -2.116648 h -5.291667 v 2.116648 h -5.29167 -4.233335 c 6.551161,-4.612972 7.030194,-4.501176 12.163515,-9.095024 1.644734,-1.471888 2.653157,-4.393195 2.653157,-6.779948 0,-5.863166 -4.720167,-10.583322 -10.583337,-10.583322 z"
          id="rect3163-52-9-8-1-1-2-7-3-6-5"
          style={{ fill: '#ff5555', fillOpacity: 1, stroke: 'none', strokeWidth: 1.05833 }} />
        <path
          d="m 13.49375,8.2020342 c -2.931583,0 -5.2916647,2.3600818 -5.2916647,5.2916648 v 0.529167 h 2.6458317 v -0.529167 c 0,-1.465791 1.180042,-2.645833 2.645833,-2.645833 1.465792,0 2.645833,1.180042 2.645833,2.645833 0,0.596636 -0.495045,1.767491 -1.01201,2.174357 -2.807123,2.209239 -2.777489,1.844378 -6.9254877,4.70481 v 3.704166 h 5.2916647 5.291668 v -2.645833 -1.058333 h -2.645835 v 1.058333 H 13.49375 11.377084 c 3.275573,-2.3065 3.515095,-2.250599 6.081755,-4.54752 0.822368,-0.735944 1.326579,-2.196603 1.326579,-3.38998 0,-2.931583 -2.360085,-5.2916648 -5.291668,-5.2916648 z"
          id="rect3163-52-9-8-1-1-2-7-3-6-0-9"
          style={{ fill: '#ffffff', fillOpacity: 1, stroke: 'none', strokeWidth: 1.05833 }} />
        <path
          d="m 50.535428,87.576842 c 2.931583,0 5.291666,-2.360068 5.291666,-5.29164 v -0.529157 h -2.645833 v 0.529157 c 0,1.465781 -1.180042,2.645825 -2.645833,2.645825 -1.465792,0 -2.645834,-1.180044 -2.645834,-2.645825 0,-0.596627 0.495046,-1.767481 1.012011,-2.174338 2.807123,-2.209228 2.777489,-1.844368 6.925489,-4.704783 v -3.704149 h -5.291666 -5.291667 v 2.645815 1.058334 h 2.645833 v -1.058334 h 2.645834 2.116666 c -3.275573,2.306488 -3.515095,2.250588 -6.081754,4.547493 -0.822368,0.735947 -1.326579,2.196598 -1.326579,3.389962 0,2.931572 2.360084,5.29164 5.291667,5.29164 z"
          id="rect3163-52-9-8-1-1-2-7-3-6-0-4"
          style={{ fill: '#ffffff', fillOpacity: 1, stroke: 'none', strokeWidth: 1.05833 }} />
      </svg >
    </>
  );
}