import React from 'react';

import AudioTextLines from './audio_textlines.tsx';
import Home from './home.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useParams } from 'react-router-dom';

function ComponentWithParams() {
  let urlParams = useParams();
  console.log(urlParams);
  return <AudioTextLines />
}

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
    element: <ComponentWithParams />,
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
  return (
    <RouterProvider router={router} />
  );
}

export default AppContainer;
