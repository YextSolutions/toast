import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "./config/answersConfig";
import { CartProvider } from "./providers/CartProvider";
import { MobileViewProvider } from "./providers/MobileViewProvider";

ReactDOM.render(
  <React.StrictMode>
    <AnswersHeadlessProvider
      apiKey={answersApiKey}
      experienceKey={answersExperienceKey}
      locale="en"
      verticalKey="beverages"
      endpoints={answersSandboxEndpoints}
    >
      <CartProvider>
        <MobileViewProvider>
          <App />
        </MobileViewProvider>
      </CartProvider>
    </AnswersHeadlessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
