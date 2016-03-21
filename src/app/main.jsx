import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

import './main.css';

import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);
window.store = store;


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
