import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 18,
  },
});

const queryClient = new QueryClient()

function TextLines() {
  const { isLoading, error, data } = useQuery('text', () =>
    fetch('http://localhost:4001/data/los_tres_cerditos.txt').then(res =>
      res.text()
    )
  )

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);
  let lineArray = data.split('\n');
  let textLines = lineArray.map((textLine, index) => {
    return (<React.Fragment key={index}>
      <Typography variant="body1" >
        {textLine}
      </Typography>
    </React.Fragment>);
  });
  console.log(`textLines.lenght=${textLines.length}`);
  console.log(`textLines = ${textLines}`);
  return (<div>{textLines}</div>);
}

function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <QueryClientProvider client={queryClient}>
          <TextLines />
        </QueryClientProvider>
      </Container>
    </ThemeProvider >
  );
}

export default AppContainer;
