import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { worker } from "./mocks/browser";

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
