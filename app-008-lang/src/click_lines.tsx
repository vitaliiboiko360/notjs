import React, { useState, useEffect } from 'react';

import TextParagraph from './text_paragraph.tsx'

var lastClickedIndex = -1;
function ClickableLine(props) {

  const onClick = () => {
    props.onClick(props.index);
    console.log(`lastClickedIndex was = ${lastClickedIndex}`);
    lastClickedIndex = props.index;
  };

  return (<TextParagraph active={props.active} onClick={onClick} >
    {props.text}
  </TextParagraph>);
}

export default function ClickLines(props) {

  let lineArray = props.lines;
  const [activeIndex, setActiveIndex] = useState(-1);
  const onClick = (index) => {
    props.onClick(index)
    setActiveIndex(index);
  };

  let prevIndex = -1;
  let index = -1;
  useEffect(() => {
    const interval = setInterval(() => {
      index = props.getCurrentIndex();
      if (index === undefined || index === null) {
        console.log('WE GET BAD INDEX');
        return;
      }
      if (index != prevIndex) {
        console.log(`prevIndex=${prevIndex} new index=${index}`);
        setActiveIndex(index);
        prevIndex = index;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [index, prevIndex]);

  let textLines = lineArray.map((textLine, index) => {
    return (<React.Fragment key={index}>
      <ClickableLine
        active={(activeIndex == index) ? true : false}
        text={textLine}
        onClick={onClick}
        index={index} />
    </React.Fragment>);
  });

  console.log(`textLines.lenght=${textLines.length}`);
  return (<div>{textLines}</div>);
}