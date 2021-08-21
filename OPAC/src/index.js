import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = 'hulaanmo';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
