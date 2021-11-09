import "@hipo/react-ui-toolkit/dist/main.css";
import "./core/ui/style/_global.scss";
import "./core/ui/style/_align.scss";
import "./core/ui/style/_media-queries.scss";
import "./core/ui/style/colors/_global-colors.scss";
import "./core/ui/style/colors/_theme.scss";
import "./core/ui/typography/_typography.scss";
import "./core/ui/typography/_fonts.scss";
import "./core/ui/style/overrides/_button.scss";
import "./core/ui/style/overrides/_input.scss";

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./core/app/App";
import {AppContextProvider} from "./core/context/AppContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
