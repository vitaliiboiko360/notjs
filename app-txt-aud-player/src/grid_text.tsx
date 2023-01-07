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

let index = {
  start: 0,
  end: 4,
};
let linesContent :Array<string> = [];

function getIndicesForSubarray(offset, index, arrayLength) {
  if (arrayLength==0) return {start:0,end:0};
  if (offset==0) return index;
  if (offset > 0) {
    return { 
      start: Math.max(0, Math.min(index.start+3, arrayLength-4)),
      end: Math.min(index.end+4, arrayLength), 
    };
  }
  return {
    start: Math.max(index.start-4, 0),
    end: Math.min(arrayLength, Math.max(index.end-3, 4)),
  };
}

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

    let indices = getIndicesForSubarray(offset, index, props.lines.length);
    linesContent = props.lines.slice(indices.start, indices.end).map((line, index) => {
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
    <Box sx={{ flexGrow: 1, overflow: 'hidden', maxHeight: 700, px: 3 }}>
        <p>{offset}</p>
        {linesContent}
    </Box>
  );
}