import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CountProvider } from './services/CountService';

ReactDOM.render(
  <React.StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
