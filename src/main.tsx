import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MapSearchInput from "./index.js";
import React from "react";
import { GOOGLE_NEW_PLACES_SEARCHER, OPEN_STREET_MAP_SEARCHER } from "./searchers.js";
import { GOOGLE_PROVIDER, OPEN_STREET_MAP_PROVIDER } from "./providers.js";

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
          searcher={OPEN_STREET_MAP_SEARCHER} // DEF
          provider={OPEN_STREET_MAP_PROVIDER} // DEF
        />
        <input type="text" className={"map-search-input"} placeholder="Thanks for Contributing!"/>
      </div>
    </div>
  </StrictMode>
);
