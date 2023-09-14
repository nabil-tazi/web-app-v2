import { defineCustomElements } from '@ionic/pwa-elements/loader';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import './index.scss';
import FallBack from './pages/fall-back/fall-back';
import { logError } from './pages/fall-back/fall-back.services';

console.log('version: 6.1.30');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Socious</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <App />
    </ErrorBoundary>
  </>
  //   </React.StrictMode>
);
defineCustomElements(window);
