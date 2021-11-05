import React from 'react';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';

import App from '../App';

const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {}
});

function AppWithThemeProvider() {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><App /></ThemeProvider>
}

export default AppWithThemeProvider;