import L from 'leaflet';

const LEAFLET_CSS = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';

// CARTO "Dark Matter" basemap — keyless, free with attribution. Chosen to
// approximate the dark Google Maps styling the app used previously.
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ' +
    '&copy; <a href="https://carto.com/attributions">CARTO</a>';

const CENTER = [38.806, -77.045];
const ZOOM = 16;

const MARKER_BASE = { radius: 9, color: '#333333', weight: 1.5, fillOpacity: 1 };
const COLOR_DEFAULT = '#ffffff';
const COLOR_HIGHLIGHT = '#ff661a';
const COLOR_FAVORITE = '#ffd700';

// Wikipedia image titles containing these terms are junk (maps, logos, icons, etc.).
const BLOCKED_IMAGE_TERMS = [
    'map', 'Map', 'logo', 'Logo', 'pog', 'Flag', 'book', 'question', 'Ambox', 'Nuvola', 'btn',
];

const WIKIPEDIA_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

/**
 * Leaflet map wrapper. Unlike the lit-html components, this element drives its
 * DOM imperatively because Leaflet owns the map subtree.
 *
 * Public API (called by <oldtown-app>):
 *   - set sites(Site[])           create the markers (once)
 *   - set visibleNames(Set)       show only these sites' markers
 *   - set favorites(Set)          recolor favorited markers
 *   - highlight(name)/unhighlight(name)   transient hover color
 *   - focusSite(site)             pan to, open popup, and pulse a marker
 *
 * Emits: `wikipedia-error` (image lookups timed out), `tile-error` (tiles failed).
 */
export class MapView extends HTMLElement {
    #map = null;
    #layer = null;
    #markers = new Map(); // name -> L.CircleMarker
    #sites = [];
    #favorites = new Set();
    #visible = null; // Set<string> | null (null = all visible)
    #highlighted = null;
    #warnedWikipedia = false;
    #warnedTiles = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.#map) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = LEAFLET_CSS;

        const style = document.createElement('style');
        style.textContent = `
            :host { display: block; height: 100%; width: 100%; }
            #map { height: 100%; width: 100%; background: #1a1a1a; }
            .popup-title { display: block; margin-bottom: 6px; font-size: 15px; }
            .popup p { margin: 0 0 8px; }
            .popup-images { max-height: 160px; overflow-y: auto; }
            .wiki-img {
                height: 80px; width: 80px; object-fit: cover; border-radius: 50%;
                margin: 2px; filter: grayscale(100%); transition: filter 0.2s;
            }
            .wiki-img:hover { filter: none; }
        `;

        const mapEl = document.createElement('div');
        mapEl.id = 'map';

        this.shadowRoot.append(link, style, mapEl);

        this.#map = L.map(mapEl, { center: CENTER, zoom: ZOOM });

        const tiles = L.tileLayer(TILE_URL, {
            attribution: TILE_ATTRIBUTION,
            subdomains: 'abcd',
            maxZoom: 20,
        });
        tiles.on('tileerror', () => {
            if (this.#warnedTiles) return;
            this.#warnedTiles = true;
            this.#emit('tile-error');
        });
        tiles.addTo(this.#map);

        this.#layer = L.layerGroup().addTo(this.#map);

        // Leaflet measures the container on init; the stylesheet may still be
        // loading, so re-measure once it lands and whenever the box resizes.
        link.addEventListener('load', () => this.#map.invalidateSize());
        new ResizeObserver(() => this.#map.invalidateSize()).observe(mapEl);

        this.#buildMarkers();
    }

    #emit(type, detail) {
        this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
    }

    set sites(value) {
        this.#sites = value ?? [];
        this.#buildMarkers();
    }

    set favorites(value) {
        this.#favorites = value ?? new Set();
        this.#restyleAll();
    }

    set visibleNames(value) {
        this.#visible = value ?? null;
        this.#applyVisibility();
    }

    #buildMarkers() {
        if (!this.#map || this.#markers.size > 0 || this.#sites.length === 0) return;

        for (const site of this.#sites) {
            const marker = L.circleMarker([site.lat, site.lng], {
                ...MARKER_BASE,
                fillColor: this.#colorFor(site.name),
            });
            marker.bindTooltip(site.name);
            marker.bindPopup(() => this.#buildPopup(site), { maxWidth: 280, minWidth: 220 });
            marker.on('click', () => this.#pulse(marker));
            marker.on('mouseover', () => marker.setStyle({ fillColor: COLOR_HIGHLIGHT }));
            marker.on('mouseout', () => marker.setStyle({ fillColor: this.#colorFor(site.name) }));
            this.#markers.set(site.name, marker);
        }
        this.#applyVisibility();
    }

    #colorFor(name) {
        if (this.#highlighted === name) return COLOR_HIGHLIGHT;
        if (this.#favorites.has(name)) return COLOR_FAVORITE;
        return COLOR_DEFAULT;
    }

    #restyleAll() {
        for (const [name, marker] of this.#markers) {
            marker.setStyle({ fillColor: this.#colorFor(name) });
        }
    }

    #applyVisibility() {
        if (!this.#layer) return;
        for (const [name, marker] of this.#markers) {
            const shouldShow = this.#visible === null || this.#visible.has(name);
            const isShown = this.#layer.hasLayer(marker);
            if (shouldShow && !isShown) this.#layer.addLayer(marker);
            else if (!shouldShow && isShown) this.#layer.removeLayer(marker);
        }
    }

    highlight(name) {
        this.#highlighted = name;
        this.#markers.get(name)?.setStyle({ fillColor: COLOR_HIGHLIGHT });
    }

    unhighlight(name) {
        if (this.#highlighted === name) this.#highlighted = null;
        this.#markers.get(name)?.setStyle({ fillColor: this.#colorFor(name) });
    }

    focusSite(site) {
        const marker = this.#markers.get(site.name);
        if (!marker) return;
        this.#map.panTo([site.lat, site.lng]);
        marker.openPopup();
        this.#pulse(marker);
    }

    // Briefly grow and shrink a marker twice — the vector-marker replacement for
    // the old Google Maps marker bounce.
    #pulse(marker) {
        const base = MARKER_BASE.radius;
        let radius = base;
        let growing = true;
        let cycles = 0;
        const id = setInterval(() => {
            radius += growing ? 2 : -2;
            if (radius >= base + 6) growing = false;
            if (radius <= base) {
                radius = base;
                growing = true;
                cycles += 1;
            }
            marker.setRadius(radius);
            if (cycles >= 2) {
                clearInterval(id);
                marker.setRadius(base);
            }
        }, 60);
    }

    #buildPopup(site) {
        const container = document.createElement('div');
        container.className = 'popup';

        const title = document.createElement('strong');
        title.className = 'popup-title';
        title.textContent = site.name;
        container.appendChild(title);

        const desc = document.createElement('p');
        desc.innerHTML = site.description; // trusted, hardcoded content
        container.appendChild(desc);

        if (site.wikipediaID) {
            const header = document.createElement('strong');
            header.appendChild(document.createTextNode('Images from '));
            const link = document.createElement('a');
            link.href = `https://en.wikipedia.org/?curid=${site.wikipediaID}`;
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = 'Wikipedia';
            header.appendChild(link);
            container.appendChild(header);

            const images = document.createElement('div');
            images.className = 'popup-images';
            container.appendChild(images);
            this.#pullImages(site.wikipediaID, images);
        }

        return container;
    }

    /* Query the MediaWiki API for images on the page, filter junk, then resolve
       each surviving image to a validated HTTPS Wikimedia URL and append it. */
    async #pullImages(wikipediaID, imagesContainer) {
        const timeout = !this.#warnedWikipedia
            ? setTimeout(() => {
                  this.#warnedWikipedia = true;
                  this.#emit('wikipedia-error');
              }, 3000)
            : null;

        try {
            const params = new URLSearchParams({
                action: 'query',
                pageids: wikipediaID,
                prop: 'images',
                format: 'json',
                origin: '*',
            });
            const response = await fetch(`${WIKIPEDIA_ENDPOINT}?${params}`);
            const data = await response.json();
            clearTimeout(timeout);
            const images = data.query.pages[wikipediaID].images ?? [];
            for (const image of images) {
                if (!BLOCKED_IMAGE_TERMS.some((term) => image.title.includes(term))) {
                    this.#resolveImageURL(image.title, imagesContainer);
                }
            }
        } catch {
            clearTimeout(timeout);
        }
    }

    async #resolveImageURL(imageName, imagesContainer) {
        try {
            const params = new URLSearchParams({
                action: 'query',
                prop: 'imageinfo',
                iiprop: 'url',
                titles: imageName,
                format: 'json',
                origin: '*',
            });
            const response = await fetch(`${WIKIPEDIA_ENDPOINT}?${params}`);
            const data = await response.json();
            const [pageId] = Object.keys(data.query.pages);
            const imageUrl = data.query.pages[pageId].imageinfo[0].url;
            const parsed = new URL(imageUrl);
            if (parsed.protocol !== 'https:') return;
            if (!parsed.hostname.endsWith('.wikimedia.org') && !parsed.hostname.endsWith('.wikipedia.org')) {
                return;
            }
            const anchor = document.createElement('a');
            anchor.href = imageUrl;
            anchor.target = '_blank';
            anchor.rel = 'noopener';
            const img = document.createElement('img');
            img.className = 'wiki-img';
            img.src = imageUrl;
            img.alt = imageName.replace(/^File:/i, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
            anchor.appendChild(img);
            imagesContainer.appendChild(anchor);
        } catch {
            // network or parse error — discard this image silently
        }
    }
}

customElements.define('map-view', MapView);
