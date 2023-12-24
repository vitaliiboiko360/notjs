import React from 'react';

import AudioTextLines from './audio_textlines.tsx';
import Home from './home.tsx';
import ErrorPage from './error/error.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query'
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
      let { resource } = params;
      console.log(resource);
      console.log('calling fetch from loader');
      await queryClient.fetchQuery([resource], () => { fetch(`http://192.168.1.12:4001/data/${resource}.json`) });
    },
    errorElement: <ErrorPage />
  },
]);

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppContainer;
