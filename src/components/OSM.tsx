import React, { useEffect } from "react";
import { Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Place } from "src/types";

const OSM: React.FC<{ selectedPlace: Place | null }> = ({ selectedPlace }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedPlace) {
            map.flyTo([selectedPlace.lat, selectedPlace.lng], 10);
        }
    }, [selectedPlace])
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[selectedPlace?.lat || 0, selectedPlace?.lng || 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};

export default OSM;
