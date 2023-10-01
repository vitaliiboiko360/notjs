import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import ClickLines from './click_lines.tsx';

const queryClient = new QueryClient();

function QueryLines(props) {
  const { isLoading, error, data } = useQuery('text', () => {
    console.log('fetch text called');
    return fetch('http://localhost:4001/data/los_tres_cerditos.json').then(res =>
      res.json()
    );
  }
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (<ClickLines
    onClick={props.onClick}
    lines={data} />);
}

export default function TextLines(props) {
  console.log('wraping Query and rendering TextLines')
  return (
    <QueryClientProvider client={queryClient}>
      <QueryLines
        onClick={props.onClick} />
    </QueryClientProvider >
  );
}