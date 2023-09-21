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
function appendSVGChild(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, text = '') {
  const element: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", elementType);
  Object.entries(attributes).map(a => element.setAttribute(a[0], a[1] as string));
  if (text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }
  // <animate
  // attributeName = "rx"
  // values = "0;5;0"
  // dur = "10s"
  // repeatCount = "indefinite" />
  const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animation.setAttribute("attributeName", "r");
  animation.setAttribute('from', '3');
  animation.setAttribute('to', '30');
  animation.setAttribute('begin', '0s');
  animation.setAttribute('dur', '5s');
  animation.setAttribute('repeatCount', '1');

  element.appendChild(animation);

  target.appendChild(element);
  return animation;
};

export default function TextParagraph(props) {
  const spanRef = React.useRef(null);
  const svgRef = React.useRef(null);
  let sx = {};
  if (props.active) {
    // sx = { boxShadow: 3 };
  }

  let spanId = `span_${props.index}`;
  let svgId = `svg_${props.index}`;

  function setAnimation(length) {
    let spanRect = spanRef.current.getBoundingClientRect();
    //let svgRect = window.getElementById(svgId).getBoundingClientRec();
    console.log(JSON.stringify(spanRect));
    //console.log(`svgRect.y = ${svgRect.y}`);
    //console.log(`lenght= ${length}`);

    const a = appendSVGChild('circle', svgRef.current, { 'cy': '3', 'cx': '3', 'r': '3', 'fill': 'blue' });
    a.beginElement();
  }

  function onClick() {
    setAnimation(props.length);
    props.onClick();
  }

  React.useEffect(() => {
    if (props.active) {
      return;
    }
    // let spanText = document.getElementById(spanId);
  }, []);

  // onClick={props.onClick}  width="100" height="10" 
  //<path d="M0,0 L100,0" fill="blue" strokeWidth="5" stroke="blue" />
  return (<>
    <div style={{ position: 'relative', display: 'inline' }}>
      <svg ref={svgRef} id={svgId} style={{ position: 'absolute', zIndex: -1 }}></svg>
      <span ref={spanRef} style={{ fontSize: 22, display: 'inline', }} id={spanId} onClick={onClick}>{props.text + ' '}</span>
    </div >
  </>);
}