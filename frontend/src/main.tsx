import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#0469e4ff',
      contrastText: '#ffffff',
    },

    background: {
      default: '#eef2f5',
      paper: '#ffffff',
    },

    text: {
      primary: '#111111',
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
