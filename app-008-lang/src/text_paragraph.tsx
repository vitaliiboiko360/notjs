import React from 'react';

import { useAppDispatch, useAppSelector } from './hooks.ts'
import { setActiveIndex, selectActiveIndex, setActiveIndexAction2 } from './activeIndexSlice.ts';

// attributes needs to be in format {'attr':'val','attr2':'val2',...}
function addSVGElemenReturnAnime(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, duration, to, animationId, beginAnimation) {
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

  const [active, setActive] = React.useState(false);

  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => {
    console.log(`selector index=${props.index}`);
    return state.activeIndex.value
  }
  );
  // console.log(selector);

  function setAnimation(length) {
    if (active) {
      console.log(`clicked on active index=${props.index}`);
      //return;
    }
    setActive(true);
    const parentRect = spanRef.current.getBoundingClientRect();
    const children = [].slice.call(spanRef.current.childNodes);
    // console.log(`\n${JSON.stringify(parentRect)}`);

    const coordinates = children.reduce((collectedArray, child) => {

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

    const animationElements = coordinates.map((values) => {
      let portionOfLength = lineLength / values.deltaX;
      let durationOfAnimation = Math.ceil(length / portionOfLength);
      return addSVGElemenReturnAnime('rect', svgRef.current, {
        'x': values.x, 'y': values.y, 'stroke-width': '1', 'stroke': '#33adff', 'width': '0', 'height': '1px', 'rx': '1px', 'ry': '1px'
      }, `${durationOfAnimation}s`, values.deltaX);
    });

    const runAnimation = function (index) {
      animationElements[index].addEventListener("endEvent", () => {
        if (animationElements.length > (index + 1)) {
          animationElements[index].parentNode.setAttribute('width', animationElements[index].getAttribute('to'));
          runAnimation(index + 1);
        }
        else {
          animationElements.forEach((element) => { element.parentNode.remove() });
          setActive(false);
        }
      });
      animationElements[index].beginElement();
    }
    runAnimation(0);
  }

  function onClick() {
    console.log(setActiveIndexAction2(props.index));
    console.log(setActiveIndex(props.index));
    dispatch(setActiveIndexAction2(props.index));
    setAnimation(props.length);
    props.onClick();
  }

  React.useEffect(() => {
    const { width, height, top, left } = spanRef.current.getBoundingClientRect();
    svgRef.current.style.width = `${Math.ceil(width) + 10}px`;
    svgRef.current.style.height = `${Math.ceil(height) + 1}px`;
    svgRef.current.style.top = Math.ceil(top) + 'px';
    svgRef.current.style.left = Math.ceil(left) + 'px';
  }, []);

  React.useEffect(() => {
    if (selector == props.index) {
      console.log(`we are ative paragraph index=${props.index}`);
    }
  });

  const wordsArray = props.text.split(' ');
  const wordsInSpans = wordsArray.map((w, index) => {
    return <span key={index + 1}>{w + ' '}</span>;
  });

  return (<>
    <div key={props.index} style={{ display: 'inline' }}>
      <svg ref={svgRef} style={{ position: 'absolute', zIndex: '-1' }}></svg>
      <span ref={spanRef} style={{ fontSize: 26, display: 'inline', }} onClick={onClick}>{wordsInSpans}</span>
    </div >
  </>);
}