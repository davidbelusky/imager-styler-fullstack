import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#00c400',
      contrastText: '#000',
    },
    secondary: {
      light: '#6a6a6a',
      main: '#d3d3d3',
      dark: '#f2f2f2',
      contrastText: '#000',
    },

  },

  // Override after focus text input label text stay black color
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "black",
        }
      }, 
      
      focused: {}
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
