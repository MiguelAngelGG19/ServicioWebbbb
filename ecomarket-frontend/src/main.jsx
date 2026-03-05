import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Este código es vital: Busca el <div id="root"> en tu index.html y "monta" tu App ahí.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);