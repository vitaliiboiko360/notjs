import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import ClickLines from './click_lines.tsx';

import {
  useLoaderData,
} from "react-router-dom";

const queryClient = new QueryClient();

function QueryLines(props) {
  const { isLoading, error, data } = useQuery('text', () => {
    console.log('fetch text called');
    return fetch('http://192.168.1.12:4001/data/los_tres_cerditos.json').then(res =>
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
  const data = useLoaderData();

  return (
    <ClickLines
      onClick={props.onClick}
      lines={data} />);
}