import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TextBox() {
  return <Div>{props.textToDisplay}</Div>;
}