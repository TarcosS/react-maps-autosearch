
# react-map-autosearch
[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

# MapSearchInput
`MapSearchInput` is a React component that enables automatic location searches using Google Maps. It allows users to search for and select a specific location effortlessly.

<p align="center">
  <img src="https://github.com/TarcosS/react-maps-autosearch/blob/main/src/assets/gif.gif" alt="MapSearchInput" width="70%" />
</p>

## Installation
To use this component, first install it via npm:

```sh
npm install react-maps-autosearch
```

## Usage
Follow the steps below to integrate the [`MapSearchInput`]() component into your project:

```javascript
import React from 'react';
import MapSearchInput from 'react-maps-autosearch';

const App = () => {
  const handlePlaceChange = (place) => {
    console.log('Selected place:', place);
  };

  return (
    <div>
      <h1>Google Maps Auto Search</h1>
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
    </div>
  );
};

export default App;
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

## Why Use It?
The [`MapSearchInput`]() component streamlines the process of searching for locations on Google Maps, enhancing user experience by offering the following features:

- **Easy Integration**: Works seamlessly with the Google Maps API.
- **Customizable**: Offers extensive customization options, including placeholder text, loader component, number of search results, and CSS classes.
- **User-Friendly**: Enables fast and accurate location searches, improving overall usability.

This component is an ideal solution for developers building map-based applications.

## License
[MIT][license] © [TarcosS][author]


[license]: license

[author]: https://ustech.studio/

[build-badge]: https://github.com/TarcosS/react-maps-autosearch/actions/workflows/npm-publish.yml/badge.svg

[build]: https://github.com/TarcosS/react-maps-autosearch/actions/workflows/npm-publish.yml

[coverage-badge]: https://img.shields.io/codecov/c/github/TarcosS/react-maps-autosearch.svg

[coverage]: https://codecov.io/github/TarcosS/react-maps-autosearch

[downloads-badge]: https://img.shields.io/npm/dm/react-maps-autosearch.svg

[downloads]: https://www.npmjs.com/package/react-maps-autosearch

[size-badge]: https://img.shields.io/bundlejs/size/react-maps-autosearch

[size]: https://bundlejs.com/?q=react-maps-autosearch

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified
