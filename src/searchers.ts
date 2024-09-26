import { Place } from "./types";

export const GOOGLE_NEW_PLACES_SEARCHER = {
    name: "Google Places",
    search: async (text: string, searchSize = 10, ApiKey?: string): Promise<Place[]> => {
        if (!ApiKey) {
            throw new Error("API Key is required for this searcher");
        }
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
                    textQuery: text,
                    pageSize: searchSize,
                }),
            }
        );
        const data = await response.json();
        return data.places.map((place: any) => ({
            name: place.displayName.text,
            formattedName: place.formattedAddress,
            lat: place.location.latitude,
            lng: place.location.longitude,
        }));
    },
}

export const OPEN_STREET_MAP_SEARCHER = {
    name: "Open Street Map",
    search: async (text: string, searchSize = 10): Promise<Place[]> => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?amenity=${text}&format=json&limit=${searchSize}`
        );
        const data = await response.json();
        return data.map((place: any) => ({
            name: place.name,
            formattedName: place.display_name,
            lat: Number(place.lat),
            lng: Number(place.lon),
        }));
    },
}
