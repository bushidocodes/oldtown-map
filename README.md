# oldtown-map

[![CI](https://github.com/bushidocodes/oldtown-map/actions/workflows/ci.yml/badge.svg)](https://github.com/bushidocodes/oldtown-map/actions/workflows/ci.yml)

oldtown-map renders historic locations in Old Town Alexandria, Virginia on an
interactive map as markers. It provides a sidebar with a searchable, filterable
list of these locations. Selecting a marker or a list entry opens a popup with
static information about the location, and — when the location has a Wikipedia
page — a link to that page plus scaled thumbnail images pulled from it. Sites can
be marked as favorites, which are persisted in the browser's `localStorage`.

## Tech stack

The app is intentionally dependency-light:

* **TypeScript Web Components** — each piece of UI is a custom element with its
  own Shadow DOM and scoped CSS (`<oldtown-app>`, `<app-navbar>`,
  `<site-sidebar>`, `<site-list-item>`, `<map-view>`, `<app-alert>`).
* **[Vite](https://vite.dev/)** compiles the TypeScript and bundles the app; in
  development it serves the source with hot-module reloading.
* **[lit-html](https://lit.dev/docs/libraries/standalone-templates/)** for
  declarative templating/rendering inside those components.
* **[Leaflet](https://leafletjs.com/)** with **[CARTO](https://carto.com/) dark
  basemap tiles** (OpenStreetMap data) for the map. These tiles are free and
  require **no API key**, so there are no secrets to manage.
* **[MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)** for Wikipedia
  thumbnail images (public, keyless, CORS-enabled).

`lit-html` and `leaflet` are installed from npm and bundled into the build, so
there are no CDN dependencies at runtime. The application code lives in
[`src/js/`](src/js) as TypeScript ES modules.

## Running locally

```
git clone https://github.com/bushidocodes/oldtown-map.git
cd oldtown-map
npm install
npm run dev          # Vite dev server with hot-module reloading
```

Then open the printed URL in your browser. No `.env` and no API keys are needed.

Other scripts:

* `npm run build` — type-check (`tsc`) and produce a bundled, minified build in `dist/`
* `npm run preview` — serve the contents of `dist/` locally to preview the build
* `npm run typecheck` — run the TypeScript type-checker only
* `npm run lint` — run ESLint over the source
* `npm test` — run the Vitest unit suite (jsdom)

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) lints, type-checks, tests,
and builds the app on every pull request and on pushes to `master`, so regressions
are caught before they ship. Deployment (below) is a separate workflow.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the app
with `npm run build` and publishes the generated `dist/` directory to GitHub
Pages on every push to `master`.

## Project layout

```
src/
  index.html              # host page: <oldtown-app> + entry <script src="js/app.ts">
  js/
    app.ts                # entry point (imports the root component)
    base.ts               # Component base class (lit-html render + reactive props)
    sites.ts              # the historic-site data (and the `Site` type)
    components/
      oldtown-app.ts      # root: owns state, filtering, favorites, wiring
      app-navbar.ts       # title bar + hamburger
      site-sidebar.ts     # search box, favorites toggle, list
      site-list-item.ts   # one list row
      map-view.ts         # Leaflet map, markers, popups, Wikipedia images
      app-alert.ts        # dismissible warning banner
  vite-env.d.ts           # Vite client type reference
  images/                 # icons / favicons

vite.config.ts            # Vite config (root: src/, build output: dist/)
tsconfig.json             # TypeScript compiler options
```

## Authors

* Sean McBride - [bushidocodes](https://github.com/bushidocodes)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
