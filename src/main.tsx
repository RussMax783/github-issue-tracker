import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthTokenProvider } from "./providers/AuthToken";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthTokenProvider>
      <App />
    </AuthTokenProvider>
  </React.StrictMode>
);
