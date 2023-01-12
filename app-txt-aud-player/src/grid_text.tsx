import * as React from 'react';
const useEffect = React.useEffect;
const useState = React.useState;
const useCallback = React.useCallback;
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

interface Indices {
  start: number;
  end: number;
}

function getNextIndex(offset, index, arrayLength) :Indices {
  let newIndex = index;
  if (offset>0) { newIndex = index+4; console.log('+++');}
  if (offset<0) { newIndex = index-4; console.log('---');}
  return { start:Math.max(newIndex-4,0), end:Math.min(Math.max(4,newIndex), arrayLength) };
}

function Lines(props) {
  let linesToShow = props.lines.slice(props.start, props.end).map((line, index) => {
    return(
    <React.Fragment key={index}>
    <StyledPaper
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
    </StyledPaper>
    </React.Fragment>);
  });
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', maxHeight: 700, px: 3 }}>
      {linesToShow}
    </Box>
);
}

export default function AutoGridNoWrap(props) {
  console.log(` recived lines ${props.lines.length}`);
  const [offset, setOffset] = useState(5);
  let prev = offset;

  const onWheel = useCallback(event => {
    let delta = event.deltaY;
    console.log(`we called onWeel with props.lines.length ${props.lines.length}`);
    if (delta > 0) { setOffset(prevOffset => Math.min(prevOffset+5, props.lines.length)); }
    if (delta < 0) { setOffset(prevOffset => Math.max(prevOffset-5, 5)); }
}, [props.lines.length]);

  useEffect(() => {
      window.addEventListener('wheel', onWheel, { passive: true });
      return () => window.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  let diff = offset-(Math.abs(prev));
  let end = Math.min(diff*5, props.lines.length);
  let start = Math.max(end-5, 0);
  console.log(`prev=${prev}\toffset=${offset}\tdiff=${diff}\tstart=${start}\tend=${end}`);
  return (
    <Lines
      start={offset-5}
      end={offset}
      lines={props.lines}
    />
  );
}