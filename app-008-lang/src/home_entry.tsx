import React from 'react';

export default function HomeEntry(props) {
  return (<>
    <div>
      <a href={props.href} >{props.title}</a>
    </div>
  </>);
}