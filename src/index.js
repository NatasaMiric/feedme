import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { AlertProvider } from "./contexts/AlertContext";

ReactDOM.render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>
  ,
  document.getElementById('root')
);

reportWebVitals();
