import React from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';
import { boxShadow } from '@mui/system';

import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

interface StyledTypographyProps extends TypographyProps {
  active?: boolean;
}

// const css = `text-decoration: none;
//   background-image: linear-gradient(rgb(176, 251, 188), rgb(176, 251, 188)),
//   linear-gradient(#feb2b2, #feb2b2);
//   background-size: 100% 2px, 0 2px;
//   background-position: 100% 100%, 0 100%;
//   background-repeat: no-repeat;
//   transition: background-size 2s linear;`;

const StyledTypography = styled(Typography, {
  shouldForwardProp: (props) => props !== 'active',
})<StyledTypographyProps>(({ active, theme }) => ({
  textDecoration: 'none',
  backgroundSize: '100% 2px, 0 2px',
  backgroundPosition: `100% 100%, 0 100%`,
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  //display: 'inline',
  ...(active ? {
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '2pt',
      bottom: '0px',
      display: 'block',
      width: '100%',
      backgroundColor: '#feb2b2',
      transition: 'all 3s linear',
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    },
    backgroundSize: '0 2px, 100% 2px',
    backgroundImage: 'linear-gradient(rgb(176, 251, 188), #feb2b2)',
  } : {
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '2pt',
      bottom: '0px',
      display: 'block',
      width: '100%',
      backgroundColor: '#feb2b2',
      transition: 'all 3s linear',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
    }
  })
}));

// If applying attributes, they need to be in the format {'attr':'val','attr2':'val2',...}
function appendSVGChild(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, text = '', d = '') {
  const schema = 'http://www.w3.org/2000/svg';
  const element: SVGElement = document.createElementNS(schema, elementType);
  Object.entries(attributes).map(a => element.setAttribute(a[0], a[1] as string));
  let dur = '5s'
  if (text) {
    // const textNode = document.createTextNode(text);
    // element.appendChild(textNode);
    dur = text
  }

  const animation = document.createElementNS(schema, "animateTransform");
  animation.setAttribute("attributeName", "transform");
  animation.setAttribute('from', 'M0 0');
  animation.setAttribute('to', d);
  animation.setAttribute('begin', '0s');
  animation.setAttribute('dur', dur);
  animation.setAttribute('repeatCount', '1');

  //element.appendChild(animation);
  target.appendChild(element);

  return animation;
};

export default function TextParagraph(props) {
  const spanRef = React.useRef(null);
  const svgRef = React.useRef(null);

  function setAnimation(length) {

    const parentRect = spanRef.current.getBoundingClientRect();

    const children = [].slice.call(spanRef.current.childNodes);
    console.log(`\n${JSON.stringify(parentRect)}`);
    const coordinates = children.reduce((collectedArray, child, index) => {

      const childRect = child.getBoundingClientRect();
      const x = (childRect.x - parentRect.x) > 0 ? childRect.x : 0;
      const coordinateValues = { 'x': (childRect.x - parentRect.x), 'y': childRect.height * (collectedArray.length + 1), 'deltaX': (childRect.x - parentRect.x) + childRect.width, 'lineBottomY': childRect.bottom };

      console.log(`word=${child.innerText}\t${JSON.stringify(childRect)}`);

      const foundIndex = collectedArray.findIndex((element) => {
        return element.lineBottomY === coordinateValues.lineBottomY;
      });

      if (foundIndex == -1) {
        collectedArray.push(coordinateValues);
      }
      else {
        collectedArray[foundIndex].deltaX = collectedArray[foundIndex].deltaX + childRect.width;
      }

      return collectedArray;
    }, []);


    //
    const animationElements = coordinates.map(values => {
      let path = `M ${Math.floor(values.x)} ${Math.floor(values.y)} L ${Math.floor(values.deltaX)} ${Math.floor(values.y)}`;
      return appendSVGChild('path', svgRef.current, {
        'd': path, 'stroke-width': '3', 'stroke': 'blue', 'fill': 'blue'
      }, `${length}s`, path);
    });

    animationElements.forEach(a => a.beginElement());
  }

  function onClick() {
    setAnimation(props.length);
    props.onClick();
  }

  React.useEffect(() => {
    const { width, height, top, left } = spanRef.current.getBoundingClientRect();
    svgRef.current.style.width = Math.ceil(width) + 'px';
    svgRef.current.style.height = Math.ceil(height) + 'px';
    svgRef.current.style.top = top + 'px';
    svgRef.current.style.left = left + 'px';
    if (!props.active) {
      return;
    }
  }, []);

  const wordsArray = props.text.split(' ');
  const wordsInSpans = wordsArray.map((w, index) => {
    return <span key={index + 1}>{w + ' '}</span>;
  });

  return (<>
    <div key={props.index} style={{ display: 'inline' }}>
      <svg ref={svgRef} style={{ position: 'absolute', zIndex: '-1' }}></svg>
      <span key={0} ref={spanRef} style={{ fontSize: 22, display: 'inline', }} onClick={onClick}>{wordsInSpans}</span>
    </div >
  </>);
}