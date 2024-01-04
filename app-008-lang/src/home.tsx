import React from 'react';

import { useQuery } from 'react-query'
import HomeEntry from './home_entry';

function makeUrlToResource(resource) {
  return `http://192.168.1.12:4001/${resource.replace('.json', '')}`;
}

export default function Home() {
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch('http://192.168.1.12:4001/data/list_of_texts.json').then(res =>
      res.json()
    )
  );
  if (isLoading) return 'Loading...';
  if (error) return 'Error getting list of texts: ' + error.message;

  const articles = data.texts.map((element, index) => {
    const url = makeUrlToResource(element.text);
    return (<React.Fragment key={index}>
      <HomeEntry title={element.title} href={url} />
    </React.Fragment>)
  });

  return (
    <div className="home_grid">
      <div className='home_center'>
        <h3>Short Stories</h3>
      </div>
      <div className="home_center">
        {articles}
      </div>
    </div>
  );
}