import React, { useState, useContext, useEffect } from 'react';

enum COLOR {
  BLACK = 0,
  RED,
  GREEN,
  BLUE,
  YELLOW
}

enum COLOR_OFFSETS {
  YELLOW_OFFSET = 80,
  BLUE_OFFSET = 60,
  GREEN_OFFSET = 40,
  RED_OFFSET = 20,
  BLACK_OFFSET = 10,
}

function getColorOffset(color: number) {
  if (color == COLOR.RED)
    return COLOR_OFFSETS.RED_OFFSET;
  if (color == COLOR.GREEN)
    return COLOR_OFFSETS.GREEN_OFFSET;
  if (color == COLOR.BLUE)
    return COLOR_OFFSETS.BLUE_OFFSET;
  if (color == COLOR.YELLOW)
    return COLOR_OFFSETS.YELLOW_OFFSET;
  return COLOR_OFFSETS.BLACK_OFFSET;
}

const NUMBER_OF_VALUES = 13;

function getColor(idOfCard: number) {
  if (idOfCard >= COLOR_OFFSETS.YELLOW_OFFSET
    && idOfCard <= COLOR_OFFSETS.YELLOW_OFFSET + NUMBER_OF_VALUES) {
    return COLOR.YELLOW;
  }
  if (idOfCard >= COLOR_OFFSETS.BLUE_OFFSET
    && idOfCard <= COLOR_OFFSETS.BLUE_OFFSET + NUMBER_OF_VALUES) {
    return COLOR.BLUE;
  }
  if (idOfCard >= COLOR_OFFSETS.GREEN_OFFSET
    && idOfCard <= COLOR_OFFSETS.GREEN_OFFSET + NUMBER_OF_VALUES) {
    return COLOR.GREEN;
  }
  if (idOfCard >= COLOR_OFFSETS.RED_OFFSET
    && idOfCard <= COLOR_OFFSETS.RED_OFFSET + NUMBER_OF_VALUES) {
    return COLOR.RED;
  }
  return COLOR.BLACK;
}

enum VALUES {
  ZERO = 0,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  SKIP_MOVE,
  REVERSE_TURN,
  PLUS_TWO,
}

const TOPPINGS =
  [{
    path1: 'm 32.014583,32.014568 c -5.84502,0 -10.58333,4.73832 -10.58333,10.58333 v 10.583337 c 0,5.845016 4.73831,10.583333 10.58333,10.583333 5.84502,0 10.58333,-4.738317 10.58333,-10.583333 V 42.597898 c 0,-5.84501 -4.73831,-10.58333 -10.58333,-10.58333 z m 0,5.29167 c 2.9225,0 5.29167,2.36916 5.29167,5.29166 v 10.583337 c 0,2.922503 -2.36917,5.291667 -5.29167,5.291667 -2.9225,0 -5.29167,-2.369164 -5.29167,-5.291667 V 42.597898 c 0,-2.9225 2.36917,-5.29166 5.29167,-5.29166 z',
    path2: 'm 13.493753,8.2020683 c -2.92252,0 -5.2916695,2.3691597 -5.2916695,5.2916697 v 5.29166 c 0,2.92252 2.3691495,5.29167 5.2916695,5.29167 2.9225,0 5.29166,-2.36915 5.29166,-5.29167 v -5.29166 c 0,-2.92251 -2.36916,-5.2916697 -5.29166,-5.2916697 z m 0,2.6458397 c 1.46125,0 2.64583,1.18458 2.64583,2.64583 v 5.29166 c 0,1.46126 -1.18458,2.64584 -2.64583,2.64584 -1.46126,0 -2.64584,-1.18458 -2.64584,-2.64584 v -5.29166 c 0,-1.46125 1.18458,-2.64583 2.64584,-2.64583 z',
    path3: 'm 50.535413,71.702068 c -2.92251,0 -5.29166,2.369153 -5.29166,5.291666 v 5.291667 c 0,2.922513 2.36915,5.291666 5.29166,5.291666 2.9225,0 5.29167,-2.369153 5.29167,-5.291666 v -5.291667 c 0,-2.922513 -2.36917,-5.291666 -5.29167,-5.291666 z m 0,2.645833 c 1.46125,0 2.64583,1.184582 2.64583,2.645833 v 5.291667 c 0,1.461251 -1.18458,2.645833 -2.64583,2.645833 -1.46125,0 -2.64583,-1.184582 -2.64583,-2.645833 v -5.291667 c 0,-1.461251 1.18458,-2.645833 2.64583,-2.645833 z'
  },
  ];

function getTopping(value: number) {

  return (<>
    <path
      id="path1"
      d={TOPPINGS[value].path1}
      style={{
        fill: '#ff5555',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1.05833
      }} />
    <path
      id="path2"
      d={TOPPINGS[value].path2}
      style={{
        fill: '#ffffff',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1.05833
      }} />
    <path
      id="path3"
      d={TOPPINGS[value].path3}
      style={{
        fill: '#ffffff',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1.05833
      }} />

  </>);
}

export function getCard(idOfCard: number) {
  const color = getColor(idOfCard);
  const value = idOfCard - getColorOffset(color);
  return (<g>
    <rect
      id="borderBox"
      width="63.499996"
      height="95.25"
      rx="10.583333"
      ry="10.583333"
      x="0.2645835"
      y="0.2645835"
      style={{
        fill: '#ffffff',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: 0.529167,
        strokeMiterlimit: 4,
        strokeDasharray: 'none'
      }} />
    <rect
      id="solidColoredBlock"
      width="52.916664"
      height="84.666664"
      rx="5.2916665"
      ry="5.2916665"
      x="5.5562401"
      y="5.5562553"
      style={{
        fill: '#ff5555',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1.05833
      }} />
    <path
      d="m 47.889583,21.431228 c -23.38006,0 -42.3333295,18.95328 -42.3333295,42.33333 0,5.845016 4.7383095,10.583333 10.5833295,10.583333 23.38005,0 42.33333,-18.953279 42.33333,-42.333333 0,-5.84502 -4.73832,-10.58333 -10.58333,-10.58333 z"
      style={{
        fill: '#ffffff',
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1.05833
      }} />
    {getTopping(value)}
  </g>);
}

export function getCard1(x?: number, y?: number) {
  return (<>
    <svg
      x={x || 0}
      y={y || 0}
      width="64.02916mm"
      height="95.779167mm"
      viewBox="0 0 64.02916 95.779167"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(0.3)">
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
      </g>
    </svg>
  </>);
}

export function getCard2(x?: number, y?: number) {
  return (
    <>
      <svg
        x={x || 0}
        y={y || 0}
        width="64.02916mm"
        height="95.779167mm"
        viewBox="0 0 64.02916 95.779167"
        version="1.1"
        id="svg2"
        xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(0.3)">
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
        </g>
      </svg >
    </>
  );
}

export function getCard_2() {
  return (
    <>
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
    </>
  );
}