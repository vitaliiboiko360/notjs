import React from 'react';

import AudioTextLines from './audio_textlines.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    // it renders this element
    element: <AudioTextLines />,

    // when the URL matches this segment
    path: "/",

    // with this data loaded before rendering
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
]);

function AppContainer() {
  return (

    <RouterProvider router={router} />
  );
}

export default AppContainer;
