import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom'; 

createRoot(document.getElementById('root')).render( 
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
