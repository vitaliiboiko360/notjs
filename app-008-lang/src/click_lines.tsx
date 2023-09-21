import React, { useState, useEffect } from 'react';

import TextParagraph from './text_paragraph.tsx'

var lastClickedIndex = -1;
function ClickableLine(props) {

  const onClick = () => {
    props.onClick(props.start, props.index, props.end);
    //console.log(`lastClickedIndex was = ${lastClickedIndex}`);
    lastClickedIndex = props.index;
  };

  return (<TextParagraph active={props.active} onClick={onClick} text={props.text} length={props.end - props.start} index={props.index} />);
}

export default function ClickLines(props) {

  let lineArray = props.lines;
  const [activeIndex, setActiveIndex] = useState(-1);
  const onClick = (seconds, index, end) => {
    props.onClick(seconds, end)
    setActiveIndex(index);
  };

  // let prevIndex = -1;
  // let index = -1;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     index = props.getCurrentIndex();
  //     if (index === undefined || index === null) {
  //       console.log('WE GET BAD INDEX');
  //       return;
  //     }
  //     if (index != prevIndex) {
  //       console.log(`prevIndex=${prevIndex} new index=${index}`);
  //       setActiveIndex(index);
  //       prevIndex = index;
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [index, prevIndex]);

  console.log(`ClickLines rendered`);

  let textLines = lineArray.map((textEntry, index) => {
    return (<React.Fragment key={index}>
      <ClickableLine
        active={(activeIndex == index) ? true : false}
        text={textEntry.text}
        start={textEntry.start}
        end={textEntry.end}
        onClick={onClick}
        index={index} />
    </React.Fragment>);
  });

  // console.log(`textLines.lenght=${textLines.length}`);
  return (<>
    <div>{textLines}</div>
  </>);
}