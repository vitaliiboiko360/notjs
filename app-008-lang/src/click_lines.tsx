import React from 'react';
import { Provider } from 'react-redux'

import TextParagraph from './text_paragraph.tsx'
import store from './store/store.ts'

function ClickableLine(props) {
  const onClick = () => {
    props.onClick(props.start, props.end);
  };
  return (<TextParagraph
    active={props.active}
    onClick={onClick}
    text={props.text}
    length={props.end - props.start}
    index={props.index}
    endParagraph={props.endParagraph}
  />);
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
        index={index}
        endParagraph={textEntry.endParagraph}
      />
    </React.Fragment>);
  });

  return (<>
    <Provider store={store}>
      <h2 style={{ textAlign: 'center' }}>{textLines[0]}</h2>
      <div>{textLines.slice(1)}</div>
    </Provider>
  </>);
}