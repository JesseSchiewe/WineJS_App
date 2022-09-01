import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c3073f',
      light: '#950740',
      dark: '#6f2232',
    },
    secondary: {
      main: '#c3073f',
      light: '#950740',
      dark: '#6f2232',
    },
    text: {
      primary: '#ffffff',
      secondary: '#950740',
      hint: '#ffffff',
      disabled: '#7cb342',
    },
    background: {
      default: '#1a1a1d',
      paper: '#1a1a1d',
    },
    divider: '#ffffff',
    borderColor: '#ffffff',
  },
});
