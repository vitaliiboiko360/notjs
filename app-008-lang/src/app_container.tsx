import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 18,
    },
  });

function AppContainer() {
    const [isTextLoaded, setTextIsLoaded] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:4001/data/los_tres_cerditos.txt')
            .then((response) => {
                console.log('get response');
                return response.text();
            })
            .then((loadedText)=>{
            if(!isTextLoaded)
                setText(loadedText);
                console.log(`setText called text.lenght=${text.length}`);
            })
            .catch((error)=>{
                console.log(error);
            });
        }
   
        fetchData();
        setTextIsLoaded(true);
      });

    let lineArray = text.split('\n');
    let textLines = lineArray.map((textLine, index)=>{
        <React.Fragment key={index}>
          <Typography variant="body1" >
              {textLine}
          </Typography>
        </React.Fragment>});
    console.log(`textLines.lenght=${textLines.length}`);
    console.log(`textLines = ${textLines}`);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                {textLines}
            </Container>
        </ThemeProvider>
    );
}

export default AppContainer;
