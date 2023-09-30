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
function appendSVGChild(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, duration, to, animationId, beginAnimation) {
  const schema = 'http://www.w3.org/2000/svg';
  const element: SVGElement = document.createElementNS(schema, elementType);
  Object.entries(attributes).map(a => element.setAttribute(a[0], a[1] as string));
  let dur = '3s'
  if (duration) {
    dur = duration
  }

  const animation = document.createElementNS(schema, "animate");
  animation.setAttribute('id', animationId);
  animation.setAttribute('attributeName', 'width');
  animation.setAttribute('from', 0);
  animation.setAttribute('to', to);
  animation.setAttribute('begin', 'indefinite');
  animation.setAttribute('dur', dur);
  animation.setAttribute('repeatCount', '1');

  element.appendChild(animation);
  target.appendChild(element);

  return animation;
};

export default function TextParagraph(props) {
  const spanRef = React.useRef(null);
  const svgRef = React.useRef(null);

  function setAnimation(length) {

    const parentRect = spanRef.current.getBoundingClientRect();

    const children = [].slice.call(spanRef.current.childNodes);
    // console.log(`\n${JSON.stringify(parentRect)}`);
    const coordinates = children.reduce((collectedArray, child, index) => {

      const childRect = child.getBoundingClientRect();

      const coordinateValues = { 'x': (childRect.x - parentRect.x), 'y': childRect.height * (collectedArray.length + 1), 'deltaX': childRect.width, 'lineBottomY': childRect.bottom };

      // console.log(`word=${child.innerText}\t${JSON.stringify(childRect)}`);

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


    const lineLength = coordinates.reduce((width, values) => {
      width += values.deltaX;
      return width;
    }, 0);

    const animationElements = coordinates.map((values, index) => {
      let portionOfLength = lineLength / values.deltaX;
      let durationOfAnimation = Math.ceil(length / portionOfLength);
      //const d = `M${values.x},${values.y} L${values.x + values.deltaX},${values.y}`;

      let startTime = '0s';
      let animationId = `animation_${props.index}_${index}`;
      if (index > 0) {
        let prevAnimationId = `animation_${props.index}_${index - 1}`;
        startTime = `${prevAnimationId}.end`;
        // let prevPortionOfLength = lineLength / coordinates[index - 1].deltaX;
        // let prevDurationOfAnimation = Math.floor(length / prevPortionOfLength);
        // startTime = `${prevDurationOfAnimation}s`;
      }

      return appendSVGChild('rect', svgRef.current, {
        'x': values.x, 'y': values.y, 'stroke-width': '1', 'stroke': '#33adff', 'width': '0', 'height': '1px', 'rx': '1px', 'ry': '1px'
      }, `${durationOfAnimation}s`, values.deltaX, animationId, startTime);
    });

    const runAnimation = function (index) {
      animationElements[index].addEventListener("endEvent", () => {
        console.log(`runAnimation ${index}`);

        if (animationElements.length > (index + 1)) {
          animationElements[index].parentNode.setAttribute('width', animationElements[index].getAttribute('to'));
          runAnimation(index + 1);
        }
        else {
          animationElements.forEach((element) => { element.parentNode.remove() });
        }
      });
      animationElements[index].beginElement();
    }
    runAnimation(0);
    //animationElements.forEach(a => a.beginElement());
    //animationElements[0].beginElement();
  }

  function onClick() {
    setAnimation(props.length);
    props.onClick();
  }

  React.useEffect(() => {
    const { width, height, top, left } = spanRef.current.getBoundingClientRect();
    svgRef.current.style.width = `${Math.ceil(width) + 10}px`;
    svgRef.current.style.height = `${Math.ceil(height) + 1}px`;
    svgRef.current.style.top = Math.ceil(top) + 'px';
    svgRef.current.style.left = Math.ceil(left) + 'px';
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
      <span ref={spanRef} style={{ fontSize: 22, display: 'inline', }} onClick={onClick}>{wordsInSpans}</span>
    </div >
  </>);
}