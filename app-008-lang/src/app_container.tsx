import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import AudioTextLines from './audio_textlines.tsx';

const theme = createTheme({
  typography: {
    fontSize: 18,
  },
});


function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <AudioTextLines />
    </ThemeProvider >
  );
}

export default AppContainer;
