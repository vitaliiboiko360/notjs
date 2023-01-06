import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
/*  maxWidth: 400,*/
  color: theme.palette.text.primary,
}));

export default function AutoGridNoWrap(props) {
  console.log(` recived lines ${props.lines.length}`);
  let linesContent = props.lines.map(line => {
        return(<StyledPaper
        sx={{
        my: 1,
        mx: 'auto',
        p: 2,
        }}
    >
        <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs zeroMinWidth>
            <Typography sx={{
              lineHeight: 1.3,
              fontSize: 23,
            }}>{line}</Typography>
        </Grid>
        </Grid>
    </StyledPaper>);
  });
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <p>{props.scroll}</p>
        {linesContent}
    </Box>
  );
}