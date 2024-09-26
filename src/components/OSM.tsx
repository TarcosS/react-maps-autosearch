import React, { useEffect } from "react";
import { Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Place, ProviderType } from "src/types";

const OSM: React.FC<{ selectedPlace: Place | null; provider: ProviderType }> = ({
  selectedPlace,
  provider,
}) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 12);
    }
  }, [selectedPlace]);
  return (
    <>
      <TileLayer
        attribution={provider.attribution}
        url={provider.url}
      />
      <Marker position={[selectedPlace?.lat || 0, selectedPlace?.lng || 0]}>
        <Popup>
          {selectedPlace?.formattedName}
        </Popup>
      </Marker>
    </>
  );
};

export default OSM;
