# oldtown-map
oldtown-map is a JavaScript application that renders historic locations in Old Town Alexandria Virginia on a Google Map as markers. It provides a sidebar with a list of these locations and a searchable filter list that filters both the list and the markers on the map. Selecting a marker or a location on the list opens an InfoView with static information about the location. If an item has a Wikipedia ID, then the application displays a link to the Wikipedia page for the location and the infoView loads and scales thumbnail versions of the images on the locaiton's wikipedia page.

## Project Setup

oldtown-map uses ES2015 syntax and transpiles to browser-friendly syntax using [Babel](https://babeljs.io/). It uses [gulp](https://gulpjs.com/) (v5) as the build tool. The following external libraries are vendored under `dist/bower_components` and loaded directly by `dist/index.html`:
* jQuery
* Bootstrap
* Knockout
* Knockstrap (Knockout bindings for Bootstrap... not currently used by app, but useful)

The Simpler-Sidebar Bootstrap theme is provided in this repo.

Requires Node.js 18 or newer.

To install and build, execute the following:
```
git clone https://github.com/bushidocodes/oldtown-map.git
cd oldtown-map
npm install
cp .env.example .env   # then edit .env and add your MAPS_API_KEY
npm run build
```

The build injects `MAPS_API_KEY` from `.env` into `dist/index.html`. Without it the Google Maps embed will not load. Get a Maps JavaScript API key at https://console.cloud.google.com/.

...and then open ./dist/index.html in your browser of choice

## Built with love using
* Visual Studio Code
* Babel
* Gulp

## Authors
* Sean McBride - [bushidocodes](https://github.com/bushidocodes)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
