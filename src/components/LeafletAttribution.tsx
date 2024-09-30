import React, { useState } from "react";
import Info from "../assets/svg/Info";

const LeafletAttribution = ({ attribution }: { attribution: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={"custom-attribution " + (show ? "active" : null)}
    >
      <Info color="#0098DA" width={16} height={16} style={{ flex: "none" }} />
      {show && (
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: 4
        }}>
          <a
            href="https://leafletjs.com"
            title="A JavaScript library for interactive maps"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              className="leaflet-attribution-flag"
            >
              <path fill="#4C7BE1" d="M0 0h12v4H0z"></path>
              <path fill="#FFD500" d="M0 4h12v3H0z"></path>
              <path fill="#E0BC00" d="M0 7h12v1H0z"></path>
            </svg>{" "}
            Leaflet
          </a>{" "}
          <span aria-hidden="true">|</span>
          <span
            style={{ color: "black" }}
            dangerouslySetInnerHTML={{ __html: attribution }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default LeafletAttribution;
