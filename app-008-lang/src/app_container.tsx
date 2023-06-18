import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import AudioTextLines from './audio_textlines.tsx';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
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
