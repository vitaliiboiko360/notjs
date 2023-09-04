import React from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';
import { boxShadow } from '@mui/system';

import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

interface StyledTypographyProps extends TypographyProps {
  active?: boolean;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (props) => props !== 'active',
})<StyledTypographyProps>(({ active, theme }) => ({
  ...(active && {
    fontSize: 16,
    padding: 12,
    paddingLeft: 8,
    margin: 12,
    marginLeft: 0,
  }),
}));

export default function TextParagraph(props) {

  let sx = {};
  if (props.active) {
    sx = { boxShadow: 3 };
  }

  return (<StyledTypography sx={sx} active={props.active} theme={theme} onClick={props.onClick} variant="body1" >
    {props.text}
  </StyledTypography>);
}