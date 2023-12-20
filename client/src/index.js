import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/_main.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App/App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);