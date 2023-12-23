import React from 'react';

import AudioTextLines from './audio_textlines.tsx';
import Home from './home.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",

    loader: async ({ request, params }) => {
      return null;
      // return fetch(
      //   `/fake/api/teams/${params.teamId}.json`,
      //   { signal: request.signal }
      // );
    },

    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      return null;
      // return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    //errorElement: <ErrorBoundary />,
  },
  {
    path: ":resource",
    element: <AudioTextLines />,
    loader: async ({ request, params }) => {
      //console.log(params)
      return null;
      // return fetch(
      //   `/fake/api/teams/${params.teamId}.json`,
      //   { signal: request.signal }
      // );
    }
  },
]);

function AppContainer() {
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch('http://192.168.1.12:4001/data/list_of_texts.json').then(res =>
      res.json()
    )
  );
  if (isLoading) return 'Loading...';
  if (error) return 'Error getting list of texts: ' + error.message;


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppContainer;
