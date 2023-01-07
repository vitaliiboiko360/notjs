import * as React from 'react';
const useEffect = React.useEffect;
const useState = React.useState;
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
      const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => { setOffset(e.deltaY); console.log(`deltaY=${e.deltaY}\deltaMode=${e.deltaMode}`); };
        // clear prev lstnr, if any
        window.removeEventListener('wheel', onWheel);
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    let linesContent = props.lines.map((line, index) => {
      return(<StyledPaper
      sx={{
      my: 1,
      mx: 'auto',
      p: 2,
      display: index>4 ? 'none' : 'inherit',
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
    <Box sx={{ flexGrow: 1, overflow: 'hidden', maxHeight: 700, px: 3 }}>
        <p>{offset}</p>
        {linesContent}
    </Box>
  );
}