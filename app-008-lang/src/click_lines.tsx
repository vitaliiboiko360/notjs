import React from 'react';
import Typography from '@mui/material/Typography';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});

var lastClickedIndex = -1;

function ClickableLine(props) {
  const onClick = () => {
    props.onClick(props.index);

    console.log(`lastClickedIndex was = ${lastClickedIndex}`);
    lastClickedIndex = props.index;
  };
  return (<Typography theme={theme} onClick={onClick} variant="body1" >
    {props.text}
  </Typography>);
}

export default function ClickLines(props) {
  let lineArray = props.lines;

  const onClick = (index) => props.onClick(index);

  let prevIndex = -1;
  const intervalId = setInterval(() => {
    let index = props.getCurrentIndex();
    if (index && (prevIndex != index)) {
      console.log(`prevIndex=${prevIndex} new index=${index}`);
      prevIndex = index;
    }

  }, 1000);

  let textLines = lineArray.map((textLine, index) => {
    return (<React.Fragment key={index}>
      <ClickableLine text={textLine} onClick={onClick} index={index} />
    </React.Fragment>);
  });

  console.log(`textLines.lenght=${textLines.length}`);
  return (<div>{textLines}</div>);
}