# oldtown-map

oldtown-map renders historic locations in Old Town Alexandria, Virginia on an
interactive map as markers. It provides a sidebar with a searchable, filterable
list of these locations. Selecting a marker or a list entry opens a popup with
static information about the location, and — when the location has a Wikipedia
page — a link to that page plus scaled thumbnail images pulled from it. Sites can
be marked as favorites, which are persisted in the browser's `localStorage`.

## Tech stack

The app is intentionally dependency-light and **has no build step**:

* **Vanilla JS Web Components** — each piece of UI is a custom element with its
  own Shadow DOM and scoped CSS (`<oldtown-app>`, `<app-navbar>`,
  `<site-sidebar>`, `<site-list-item>`, `<map-view>`, `<app-alert>`).
* **[lit-html](https://lit.dev/docs/libraries/standalone-templates/)** for
  declarative templating/rendering inside those components.
* **[Leaflet](https://leafletjs.com/)** with **[CARTO](https://carto.com/) dark
  basemap tiles** (OpenStreetMap data) for the map. These tiles are free and
  require **no API key**, so there are no secrets to manage.
* **[MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)** for Wikipedia
  thumbnail images (public, keyless, CORS-enabled).

`lit-html` and `leaflet` are loaded as ES modules from the
[jsDelivr](https://www.jsdelivr.com/) CDN via an
[import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
in [`src/index.html`](src/index.html). The application code in `src/js/` is plain
ES modules — nothing is transpiled or bundled.

## Running locally

Because the app uses ES modules, it must be served over HTTP (opening
`index.html` from the filesystem will not work). Any static file server works:

```
git clone https://github.com/bushidocodes/oldtown-map.git
cd oldtown-map
npm run dev          # runs `npx serve src`
```

…or use whatever you have on hand, e.g. `python -m http.server -d src 8080`.
Then open the printed URL in your browser. No `.env`, no API keys, no install.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publishes the
`src/` directory to GitHub Pages on every push to `master`. There is no build
job — the static files are deployed as-is.

## Project layout

```
src/
  index.html              # host page: import map + <oldtown-app>
  js/
    app.js                # entry point (imports the root component)
    base.js               # Component base class (lit-html render + reactive props)
    sites.js              # the historic-site data
    components/
      oldtown-app.js      # root: owns state, filtering, favorites, wiring
      app-navbar.js       # title bar + hamburger
      site-sidebar.js     # search box, favorites toggle, list
      site-list-item.js   # one list row
      map-view.js         # Leaflet map, markers, popups, Wikipedia images
      app-alert.js        # dismissible warning banner
  images/                 # icons / favicons
```

## Optional: bundling

The CDN + import-map setup keeps things simple, but if you later want a bundled,
minified, offline-capable build (e.g. to vendor the dependencies instead of
relying on the CDN at runtime), [Vite](https://vite.dev/) drops in cleanly:
point it at `src/`, swap the import-map specifiers for installed packages, and
deploy `vite build`'s output instead of `src/`.

## Authors

* Sean McBride - [bushidocodes](https://github.com/bushidocodes)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
