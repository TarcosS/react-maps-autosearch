
# react-map-autosearch
[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

<a href="https://www.buymeacoffee.com/kokkiliculL"><img height="42px" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=kokkiliculL&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>

# MapSearchInput
`MapSearchInput` is a React component that enables automatic location searches using Google Maps. It allows users to search for and select a specific location effortlessly.

<p align="center">
  <img src="https://github.com/TarcosS/react-maps-autosearch/blob/main/src/assets/gif.gif" alt="MapSearchInput" width="70%" />
</p>

## Installation
To use this component, first install it via npm:

```sh
npm install react-map-autosearch
```

## Usage
Follow the steps below to integrate the [`MapSearchInput`]() component into your project:

```javascript
import React from 'react';
import MapSearchInput from 'react-map-autosearch';

const App = () => {
  const handlePlaceChange = (place) => {
    console.log('Selected place:', place);
  };

  return (
    <MapSearchInput
      ApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      placeholder="Search for a location"
      onChange={handlePlaceChange}
      loader={<div>Loading...</div>}
      searchSize={10}
      className="map-search-input"
      classNames={{
        input: 'input-class',
        list: 'list-class',
        item: 'item-class',
      }}
      style={{ width: '100%' }}
      styles={{
        input: { padding: '10px' },
        list: { backgroundColor: 'white' },
        item: { padding: '5px' },
      }}
    />
  );
};

export default App;
```

### Exciting Update: Easily Switch Between Free Map Providers in React Map Autosearch!

You can now switch between a selection of free map providers within your React Map Autosearch setup.


```bash
  GOOGLE_PROVIDER = 'https://mts1.google.com/vt/x={x}&y={y}&z={z}'
  OPEN_STREET_MAP_PROVIDER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  STADIA_PROVIDER = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
```

Enjoy the flexibility of choosing the map provider that best fits your needs—whether it's Google Maps, OpenStreetMap, or Stadia Maps!

### Exciting Update 2: Seamlessly Switch Between Place Searchers in Our System!

Now you can easily switch between different place search providers in our system. Choose from paid or free place APIs, enter your API key, and start using it right away!

```bash
  GOOGLE_NEW_PLACES_SEARCHER
  GOOGLE_OLD_PLACES_SEARCHER -> SOON
  OPEN_STREET_MAP_SEARCHER -> Nominatim
```

## Props
The [`MapSearchInput`]() component accepts the following props:

- **ApiKey** (string, required): Your Google Maps API key.
- **placeholder** (string, optional): Placeholder text for the search input. Default: "Search..."
- **onChange** (function, required): Callback function triggered when a location is selected. Receives the selected `place` object as a parameter.
- **loader** (ReactNode, optional): A loader component displayed while search results are loading.
- **searchSize** (number, optional): The maximum number of search results. Default: 10.
- **className** (string, optional): Additional CSS class for the main component.
- **classNames** (object, optional): Additional CSS classes for internal elements. Example:
  - `input`: CSS class for the search input.
  - `list`: CSS class for the results list.
  - `item`: CSS class for each result item.
- **style** (object, optional): Inline styles for the main component.
- **styles** (object, optional): Inline styles for internal elements. Example:
  - `input`: Styles for the search input.
  - `list`: Styles for the results list.
  - `item`: Styles for each result item.
- **enablePreview** (boolean, optional): If you want to change visibility of [Map Preview]() make it false.
- **enablePreviewRelative** (boolean, optional): Position; relative or absolute for true or false.
- provider: Map Preview provider. Default OPEN_STREET_MAP_PROVIDER
- searcher: Place searcher. Default OPEN_STREET_MAP_SEARCH

## Why Use It?
The [`MapSearchInput`]() component streamlines the process of searching for locations on Google Maps, enhancing user experience by offering the following features:

- **Easy Integration**: Works seamlessly with the Google Maps API.
- **Customizable**: Offers extensive customization options, including placeholder text, loader component, number of search results, and CSS classes.
- **User-Friendly**: Enables fast and accurate location searches, improving overall usability.

This component is an ideal solution for developers building map-based applications.

## License
[MIT][license] © [TarcosS][author]


[license]: LICENSE

[author]: https://ustech.studio/

[build-badge]: https://github.com/TarcosS/react-maps-autosearch/actions/workflows/npm-publish.yml/badge.svg

[build]: https://github.com/TarcosS/react-maps-autosearch/actions/workflows/npm-publish.yml

[downloads-badge]: https://img.shields.io/npm/dm/react-map-autosearch.svg

[downloads]: https://www.npmjs.com/package/react-map-autosearch

[size-badge]: https://img.shields.io/bundlejs/size/react-map-autosearch

[size]: https://bundlejs.com/?q=react-map-autosearch
