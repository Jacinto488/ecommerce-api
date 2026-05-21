import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId="392469389825-esiaf23u0afsfn8oemo0fgqns0nqeakm.apps.googleusercontent.com">

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>
);