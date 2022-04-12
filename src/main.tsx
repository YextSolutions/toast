import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import { answersSandboxEndpoints } from "./config";

ReactDOM.render(
  <React.StrictMode>
    <AnswersHeadlessProvider
      apiKey="220cb8d6ae04d12ee7564f9421ec0a9e"
      experienceKey="beverages"
      locale="en"
      verticalKey="beverages"
      endpoints={answersSandboxEndpoints}
    >
      <App />
    </AnswersHeadlessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
