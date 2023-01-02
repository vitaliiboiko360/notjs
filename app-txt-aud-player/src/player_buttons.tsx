import * as React from 'react';
const useState = React.useState;
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import IconButton, {iconButtonClasses} from '@mui/material/IconButton';
import { ToggleButton } from '@mui/material';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const CustomButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
  `,
);
const buttonSidePx = '60px';
const PlayButton = styled(ButtonUnstyled)(
    ({ theme }) => `
    background-image: url('http://localhost:4001/data/play-button.png');
    background-size: ${buttonSidePx} ${buttonSidePx};
    width: ${buttonSidePx};
    height: 60px;
    border-radius: 13px;
    border: none;


    &:hover {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }

    &.${buttonUnstyledClasses.active} {
      background-image: url('http://localhost:4001/data/pause-button.png');
    }
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
`,);

const PlayButton2 = styled(ToggleButton)`
    background-image: url('http://localhost:4001/data/play-button.png');
    background-size: ${buttonSidePx} ${buttonSidePx};
    width: ${buttonSidePx};
    height: 60px;
    border-radius: 13px;
    border: none;


    &:hover {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }

    &.Mui-selected {
      background-image: url('http://localhost:4001/data/pause-button.png');
    }
    &.Mui-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
`;

export default function PlayerButtons(props) {
  const [selected, setSelected] = useState(false);
  //if (props.ended) setSelected(false);
  return (
    <Stack spacing={2} direction="row">
      <CustomButton>Backward -5 Seconds</CustomButton>
      <PlayButton2
        value={'play/pause'}
        selected={props.ended ? false : selected}
        onClick={() => {
          props.setActivePlay(!selected);
          setSelected(!selected);
        }}
        sx={{
        name: 'Play',
      }}></PlayButton2>
      <CustomButton>Forward +5 Seconds</CustomButton>
    </Stack>
  );
}