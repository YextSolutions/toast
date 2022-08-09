import React from "react";
import ReactDOM from "react-dom/client";
import { SearchHeadlessProvider, SandboxEndpoints } from "@yext/search-headless-react";
import searchConfig from "./config/searchConfig";
import { AppContextProvider } from "./providers/AppContextProvider";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchHeadlessProvider {...searchConfig} endpoints={SandboxEndpoints}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </SearchHeadlessProvider>
  </React.StrictMode>
);
