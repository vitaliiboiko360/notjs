import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  border: '1px solid blue',
  borderRadius: '25px',
}));

export default function TextBox(props) {
  return <Div
  sx={{
     overflow-wrap: 'normal',
     max-height: '600px',
     overflow-y: 'auto',}}
  >{props.children}</Div>;
}