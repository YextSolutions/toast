import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SearchHeadlessProvider, SandboxEndpoints } from "@yext/search-headless-react";
import searchConfig from "./config/searchConfig";
import { AppContextProvider } from "./providers/AppContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <SearchHeadlessProvider {...searchConfig} endpoints={SandboxEndpoints}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </SearchHeadlessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
