import React from 'react';

export default function HomeEntry(props) {
  return (<>
    <div>
      <a href={props.url} >{props.title}</a>
    </div>
  </>);
}