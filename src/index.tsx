import React, { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import { motion } from "framer-motion";

import { MapSearchInputProps, Place } from "./types";

import OSM from "./components/OSM";

import UilMapMarker from "./assets/svg/Marker";

import { GOOGLE_PROVIDER, OPEN_STREET_MAP_PROVIDER } from "./providers";

import "./assets/index.css";
import "leaflet/dist/leaflet.css";
import { OPEN_STREET_MAP_SEARCHER } from "./searchers";

const listVariants = {
  open: { opacity: 1, x: 0, zIndex: 100 },
  closed: { opacity: 0, y: "-10px", zIndex: -100 },
};

const MapSearchInput: React.FC<MapSearchInputProps> = ({
  ApiKey,
  placeholder = "Search...",
  onChange,
  loader,
  searchSize = 10,
  className,
  classNames,
  style,
  styles,
  enablePreview = true,
  enablePreviewRelative = false,
  provider = OPEN_STREET_MAP_PROVIDER,
  searcher = OPEN_STREET_MAP_SEARCHER,
}) => {
  const mapVariants = {
    open: { opacity: 1, x: 0, zIndex: 100 },
    closed: enablePreviewRelative
      ? { opacity: 0, y: "10px", zIndex: 0, height: 0, display: "none" }
      : { opacity: 0, y: "10px", zIndex: 0 },
  };
  const [text, setText] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPending, setPending] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  if (provider.needKey && !ApiKey) {
    throw new Error("API Key is required for this provider");
  }

  const updatePlaces = async (string: string) => {
    setPending(true);
    const response = await searcher.search(string, searchSize, ApiKey);

    setPlaces(response);
    setPending(false);
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedPlace);
    }
  }, [selectedPlace, onChange]);

  useEffect(() => {
    if (text.length > 0) {
      updatePlaces(text);
    } else {
      setPlaces([]);
      setSelectedPlace(null);
    }
  }, [text]);

  return (
    <div
      className={"map-search-wrapper " + className}
      style={style}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
    >
      {enablePreview && (
        <motion.div
          animate={
            enablePreviewRelative
              ? selectedPlace
                ? "open"
                : "closed"
              : isFocus || isHover
              ? selectedPlace
                ? "open"
                : "closed"
              : "closed"
          }
          variants={mapVariants}
          className={
            "map-search-map " +
            classNames?.mapWrapper +
            (enablePreviewRelative ? " relative" : "")
          }
          style={styles?.mapWrapper}
        >
          <MapContainer
            center={[selectedPlace?.lat || 0, selectedPlace?.lng || 0]}
            zoom={3}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <OSM selectedPlace={selectedPlace} provider={provider} />
          </MapContainer>
        </motion.div>
      )}
      <input
        ref={inputRef}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        type="text"
        className={"map-search-input " + classNames?.input}
        style={styles?.input}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <motion.div
        className={"map-search-list " + classNames?.list}
        style={styles?.list}
        animate={isFocus ? (text.length > 0 ? "open" : "closed") : "closed"}
        variants={listVariants}
      >
        {isPending &&
          (loader ?? <div className="map-search-list-item">Loading...</div>)}
        {places.map((place, index) => (
          <div
            key={`place_${index}`}
            className={
              "map-search-list-item " +
              classNames?.listItem +
              (selectedPlace === place
                ? "active " + classNames?.listItemActive
                : "")
            }
            style={styles?.listItem}
            onClick={() => {
              setSelectedPlace(selectedPlace === place ? null : place);
              setText(place.name);
              inputRef.current?.focus();
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <UilMapMarker
                style={{ flex: "none", position: "relative" }}
                width={16}
              />
              <div className="map-search-list-item-title">{place.name}</div>
            </div>
            <div className="map-search-list-item-subtitle">
              {place.formattedName}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MapSearchInput;
