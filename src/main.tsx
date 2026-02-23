import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import axe from "@axe-core/react";
import "./index.css";
import App from "./App.tsx";
import { worker } from "./mocks/browser";

if (import.meta.env.DEV) {
  setTimeout(() => axe(React, ReactDOM, 1000), 1000);
}

// Start MSW with configuration to ignore external requests (like images)
worker
  .start({
    onUnhandledRequest(req, print) {
      // Ignore requests to external domains (like unsplash.com for images)
      const url = new URL(req.url);
      if (url.origin !== window.location.origin) {
        return;
      }
      // Only warn about unhandled requests to our own API
      if (url.pathname.startsWith("/api/")) {
        print.warning();
      }
    },
  })
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
