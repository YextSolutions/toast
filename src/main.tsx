import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "./config";

ReactDOM.render(
  <React.StrictMode>
    <AnswersHeadlessProvider
      apiKey={answersApiKey}
      experienceKey={answersExperienceKey}
      locale="en"
      verticalKey="beverages"
      endpoints={answersSandboxEndpoints}
    >
      <App />
    </AnswersHeadlessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
