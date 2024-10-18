import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTHO_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_ID;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root using the new API

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);