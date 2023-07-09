import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import ClickLines from './click_lines.tsx';

const queryClient = new QueryClient();

function QueryLines(props) {
  const { isLoading, error, data } = useQuery('text', () => {
    console.log('fetch text called');
    return fetch('http://localhost:4001/data/los_tres_cerditos.txt').then(res =>
      res.text()
    );
  }
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  let lineArray = data.split('\n');
  let textLines = lineArray.map((textLine, index) => {
    return textLine;
  });

  return (<ClickLines onClick={props.onClick} lines={textLines} />);
}

export default function TextLines(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryLines onClick={props.onClick} />
    </QueryClientProvider >
  );
}