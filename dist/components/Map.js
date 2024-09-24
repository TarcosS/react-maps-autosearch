import React from 'react';
import { AdvancedMarker, Map as MapProvider, Pin } from "@vis.gl/react-google-maps";
var Map = function (_a) {
    var center = _a.center;
    return (React.createElement(MapProvider, { style: { width: "100%", height: "100%" }, center: center, zoom: 15, disableDefaultUI: true, controlled: false, disableDoubleClickZoom: false, mapId: "2ed4af91a557537e", gestureHandling: "none" },
        React.createElement(AdvancedMarker, { position: center, style: { pointerEvents: "none" } },
            React.createElement(Pin, { background: '#727272FF', borderColor: '#FFFFFF', glyphColor: '#FFFFFF' }))));
};
export default Map;
