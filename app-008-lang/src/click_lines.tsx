import React, { useState, useEffect } from 'react';

import TextParagraph from './text_paragraph.tsx'

function ClickableLine(props) {
  const onClick = () => {
    props.onClick(props.start, props.end);
  };
  return (<TextParagraph active={props.active} onClick={onClick} text={props.text} length={props.end - props.start} index={props.index} />);
}

function useTraceUpdate(props) {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

export default function ClickLines(props) {
  useTraceUpdate(props);
  console.log(`ClickLines rendered`);

  let lineArray = props.lines;
  let textLines = lineArray.map((textEntry, index) => {
    return (<React.Fragment key={index}>
      <ClickableLine
        active={false}
        text={textEntry.text}
        start={textEntry.start}
        end={textEntry.end}
        onClick={props.onClick}
        index={index} />
    </React.Fragment>);
  });

  return (<>
    <div>{textLines}</div>
  </>);
}