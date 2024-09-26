import { ProviderType } from "./types"

export const GOOGLE_PROVIDER: ProviderType  = {
    url: "https://mts1.google.com/vt/x={x}&y={y}&z={z}",
    needKey: false,
    attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
}

export const OPEN_STREET_MAP_PROVIDER: ProviderType = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    needKey: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

export const MAP_TILES_PROVIDER: ProviderType = {
    url: `https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key={apikey}`,
    needKey: true,
    attribution: '&copy; <a href="http://www.maptilesapi.com/">MapTiles API</a>'
}

export const STADIA_PROVIDER: ProviderType = {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    needKey: false,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
}