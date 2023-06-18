import React from 'react';
import Typography from '@mui/material/Typography';

function ClickableLine(props) {
  const onClick = () => { props.onClick(props.index) };
  return (<Typography onClick={onClick} variant="body1" >
    {props.text}
  </Typography>);
}

export default function ClickLines(props) {
  let lineArray = props.lines;
  const onClick = (index) => props.onClick(index);
  let textLines = lineArray.map((textLine, index) => {
    return (<React.Fragment key={index}>
      <ClickableLine text={textLine} onClick={onClick} index={index} />
    </React.Fragment>);
  });
  console.log(`textLines.lenght=${textLines.length}`);
  return (<div>{textLines}</div>);
}