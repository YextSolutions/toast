import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";

export const answersSandboxEndpoints = {
  universalSearch:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query?someparam=blah",
  verticalSearch:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
  questionSubmission:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
  status: "https://answersstatus.pagescdn.com",
  universalAutocomplete:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
  verticalAutocomplete:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
  filterSearch:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
};

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
