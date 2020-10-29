import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  background: '#2C3849',
  fontFamily: "Roboto",
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#2C3849'
    }
  },
  typography: {
    fontFamily: "Roboto"
  }
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
