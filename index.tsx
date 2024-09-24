import React, { useEffect, useRef, useState } from "react";
import { MapSearchInputProps, Place } from "./src/types";
import "../assets/index.css";
import UilMapMarker from "./src/assets/svg/Marker";
import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./src/components/Map";
import { motion } from "framer-motion";

const mapVariants = {
  open: { opacity: 1, x: 0, zIndex: 100 },
  closed: { opacity: 0, y: "10px", zIndex: -100 },
};

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
}) => {
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
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": ApiKey,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location",
        },
        body: JSON.stringify({
          textQuery: string,
          pageSize: searchSize,
        }),
      }
    );
    setPending(false);
    const data = await response.json();
    setPlaces(
      data.places.map((place: any) => ({
        name: place.displayName.text,
        formattedName: place.formattedAddress,
        lat: place.location.latitude,
        lng: place.location.longitude,
      }))
    );
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
      <motion.div
        animate={
          isFocus || isHover ? (selectedPlace ? "open" : "closed") : "closed"
        }
        variants={mapVariants}
        className={"map-search-map " + classNames?.mapWrapper}
        style={styles?.mapWrapper}
      >
        <APIProvider apiKey={ApiKey}>
          <Map
            center={{
              lat: selectedPlace?.lat || 0,
              lng: selectedPlace?.lng || 0,
            }}
          />
        </APIProvider>
      </motion.div>
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
                style={{ flex: "none", position: "relative", top: 3 }}
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
