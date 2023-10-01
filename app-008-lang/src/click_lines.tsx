import React from 'react';
import { Provider } from 'react-redux'

import TextParagraph from './text_paragraph.tsx'

const store = {};

function ClickableLine(props) {
  const onClick = () => {
    props.onClick(props.start, props.end);
  };
  return (<TextParagraph active={props.active} onClick={onClick} text={props.text} length={props.end - props.start} index={props.index} />);
}

export default function ClickLines(props) {

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
    <Provider store={store}><div>{textLines}</div></Provider>
  </>);
}