import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MapSearchInput from "./index.js";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      style={{
        width: "100dvw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <input type="text" className={"map-search-input"} placeholder="Hello!"/>
        <MapSearchInput
          // ApiKey={(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY}
          style={{
            width: 300,
          }}
          enablePreviewRelative
        />
        <input type="text" className={"map-search-input"} placeholder="Thanks for Contributing!"/>
      </div>
    </div>
  </StrictMode>
);
