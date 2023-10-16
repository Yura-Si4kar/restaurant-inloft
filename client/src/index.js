import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './modules/App/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
