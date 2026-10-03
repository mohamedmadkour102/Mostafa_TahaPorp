import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setWorkerUrl } from "maplibre-gl";
import "./theme/tokens.css";
import "./index.css";
import App from "./App";

// Production bundles MapLibre into the app chunk, so its default
// ./maplibre-gl-worker.mjs URL 404s and GeoJSON circles never paint.
setWorkerUrl(`${import.meta.env.BASE_URL}vendor/maplibre/maplibre-gl-worker.mjs`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
