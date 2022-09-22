import React from 'react';
import ReactDOM from 'react-dom/client';
import {Amplify} from 'aws-amplify';
import config from './config';
import './normalize.css';
import App from './App';

Amplify.configure({
  Auth: {
    mandatorySignIn: true, 
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'users',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
