import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios'
import {API_URL} from './constants'
import {createStore} from 'redux'
import allReducers from './redux/reducers'
import { Provider } from 'react-redux'


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

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
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
