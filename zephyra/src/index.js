import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthWrapper from "./AuthWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain="dev-u3pvqte1l7ripqyb.us.auth0.com"
        clientId="POGOnHM3fDweGwJetoiqcDCHEEfS4dM1"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <AuthWrapper />
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
