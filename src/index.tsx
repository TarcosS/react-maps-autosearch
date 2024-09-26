import React, { useEffect, useRef, useState } from "react";
import { MapSearchInputProps, Place } from "./types";
import "./assets/index.css";
import UilMapMarker from "./assets/svg/Marker";
import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./components/Map";
import { motion } from "framer-motion";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OSM from "./components/OSM";

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

  const updatePlaces = async (string: string) => {
    setPending(true);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?amenity=${string}&format=json&limit=${searchSize}`
    );

    const data = await response.json();
    setPlaces(
      data.map((place: any) => ({
        name: place.name,
        formattedName: place.display_name,
        lat: Number(place.lat),
        lng: Number(place.lon),
      }))
    );
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
          {ApiKey ? (
            <APIProvider apiKey={ApiKey}>
              <Map
                center={{
                  lat: selectedPlace?.lat || 0,
                  lng: selectedPlace?.lng || 0,
                }}
              />
            </APIProvider>
          ) : (
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
              <OSM
                selectedPlace={selectedPlace}
              />
            </MapContainer>
          )}
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
