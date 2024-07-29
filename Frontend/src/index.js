import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /**
   * React.StrictMode helps us in indentifying potential problems in an application by activating additional checks and warnings for it's child component during development.
   */
  <React.StrictMode>
    {/* Calling the App Component. App Component is the root component that manages the application's main structure and renders other components. */}
    <App />
  </React.StrictMode>
);