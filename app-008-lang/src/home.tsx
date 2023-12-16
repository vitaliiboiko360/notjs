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

  const articles = data.texts.map((element, index) => {
    return (<React.Fragment key={index}>
      <div><h3>{element.title}</h3></div>
    </React.Fragment>)
  });
  console.log(articles.length);
  return (
    <div className="home.grid">
      {articles}
    </div>
  );
}