import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import reportWebVitals from './reportWebVitals';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SmuHWFUDs",
  client_id: "2kih0h4ra0c1ognli9tomv1hs7",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...cognitoAuthConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
reportWebVitals();