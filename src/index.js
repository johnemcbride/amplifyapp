import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { Hub } from 'aws-amplify';
import { BrowserRouter } from "react-router-dom";

function listenToAutoSignInEvent() {
  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      const user = payload.data;
      console.log('autosign in happened')
      console.log(user)
    } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
    }
  })
}

Amplify.configure(config);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
