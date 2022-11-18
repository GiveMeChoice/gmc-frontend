import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
  },
  palette: {
    primary: {
      main: '#a7f700',
      light: '#354a5f94',
    },
    secondary: {
      main: '#F0F0F5',
    },
  },
});

ReactDOM.render(
  // <ThemeProvider theme={theme}>
  <BrowserRouter>
    {/* <CssBaseline /> */}
    <App />
  </BrowserRouter>,
  // </ThemeProvider>,
  document.getElementById('root')
);
