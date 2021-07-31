import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import './index.css';
import App from './App';
import store from './store/store';
import reportWebVitals from './reportWebVitals';

// f9f871
// ff5e78

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#845ec2', // This is an violet looking color
    },
    secondary: {
      main: '#ffc75f',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
