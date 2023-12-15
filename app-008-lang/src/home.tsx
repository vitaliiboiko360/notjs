import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeWithData />
    </QueryClientProvider>
  );
}

function HomeWithData() {
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch('http://192.168.1.12:4001/data/list_of_texts.json').then(res =>
      res.json()
    )
  );
  if (isLoading) return 'Loading...';
  if (error) return 'Error getting list of texts: ' + error.message;

  const articles = data.map((element) => { `<div>${element}</div>` });

  return (
    <div class="home.grid">
      {articles}
    </div>
  );
}