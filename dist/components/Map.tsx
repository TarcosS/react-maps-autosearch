import React from 'react'
import { AdvancedMarker, Map as MapProvider, Pin } from "@vis.gl/react-google-maps";
import { MapProps } from '../types';

const Map: React.FC<MapProps> = ({
    center
}) => {

  return (
    <MapProvider
        style={{ width: "100%", height: "100%" }}
        center={center}
        zoom={15}
        disableDefaultUI={true}
        controlled={false}
        disableDoubleClickZoom={false}
        mapId={"2ed4af91a557537e"}
        gestureHandling={"none"}
    >
        <AdvancedMarker position={center} style={{pointerEvents: "none"}}>
            <Pin
                background={'#727272FF'}
                borderColor={'#FFFFFF'}
                glyphColor={'#FFFFFF'}
            />
        </AdvancedMarker>
    </MapProvider>
  )
}

export default Map