import L from 'leaflet';
import leafletCss from 'leaflet/dist/leaflet.css?url';
import type { Site } from '../sites.js';

// CARTO "Dark Matter" basemap — keyless, free with attribution. Chosen to
// approximate the dark Google Maps styling the app used previously.
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ' +
    '&copy; <a href="https://carto.com/attributions">CARTO</a>';

const CENTER: L.LatLngTuple = [38.806, -77.045];
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
    declare readonly shadowRoot: ShadowRoot;

    #map: L.Map | null = null;
    #layer: L.LayerGroup | null = null;
    #markers = new Map<string, L.CircleMarker>(); // name -> L.CircleMarker
    #sites: Site[] = [];
    #favorites = new Set<string>();
    #visible: Set<string> | null = null; // null = all visible
    #highlighted: string | null = null;
    #warnedWikipedia = false;
    #warnedTiles = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        if (this.#map) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = leafletCss;

        const style = document.createElement('style');
        style.textContent = `
            :host { display: block; height: 100%; width: 100%; }
            #map { height: 100%; width: 100%; background: #1a1a1a; }
            .popup-title { display: block; margin-bottom: 6px; font-size: 15px; }
            .popup p { margin: 0 0 8px; }
            /* Fixed height (not max-height) so the popup's total size is known
               when it opens — Wikipedia images load asynchronously and would
               otherwise grow the popup upward past the top of the map after
               autoPan has already run. */
            .popup-images { height: 92px; overflow-y: auto; }
            .wiki-img {
                height: 80px; width: 80px; object-fit: cover; border-radius: 50%;
                margin: 2px; filter: grayscale(100%); transition: filter 0.2s;
            }
            .wiki-img:hover { filter: none; }
        `;

        const mapEl = document.createElement('div');
        mapEl.id = 'map';

        this.shadowRoot.append(link, style, mapEl);

        const map = L.map(mapEl, { center: CENTER, zoom: ZOOM });
        this.#map = map;

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
        tiles.addTo(map);

        this.#layer = L.layerGroup().addTo(map);

        // Leaflet measures the container on init; the stylesheet may still be
        // loading, so re-measure once it lands and whenever the box resizes.
        link.addEventListener('load', () => map.invalidateSize());
        new ResizeObserver(() => {
            map.invalidateSize();
            this.#updatePopupHeights();
        }).observe(mapEl);

        this.#buildMarkers();
    }

    #emit(type: string, detail?: unknown): void {
        this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
    }

    set sites(value: Site[] | undefined) {
        this.#sites = value ?? [];
        this.#buildMarkers();
    }

    set favorites(value: Set<string> | undefined) {
        this.#favorites = value ?? new Set();
        this.#restyleAll();
    }

    set visibleNames(value: Set<string> | null | undefined) {
        this.#visible = value ?? null;
        this.#applyVisibility();
    }

    #buildMarkers(): void {
        if (!this.#map || this.#markers.size > 0 || this.#sites.length === 0) return;

        for (const site of this.#sites) {
            const marker = L.circleMarker([site.lat, site.lng], {
                ...MARKER_BASE,
                fillColor: this.#colorFor(site.name),
            });
            marker.bindTooltip(site.name);
            marker.bindPopup(() => this.#buildPopup(site), {
                maxWidth: 280,
                minWidth: 220,
                // Cap the popup to the map height (Leaflet adds an internal
                // scrollbar) so a tall popup can't outgrow the viewport and get
                // clipped off the top — autoPan can then reveal it fully.
                maxHeight: this.#popupMaxHeight(),
                autoPanPadding: L.point(16, 16),
            });
            marker.on('click', () => this.#pulse(marker));
            marker.on('mouseover', () => marker.setStyle({ fillColor: COLOR_HIGHLIGHT }));
            marker.on('mouseout', () => marker.setStyle({ fillColor: this.#colorFor(site.name) }));
            this.#markers.set(site.name, marker);
        }
        this.#applyVisibility();
    }

    #colorFor(name: string): string {
        if (this.#highlighted === name) return COLOR_HIGHLIGHT;
        if (this.#favorites.has(name)) return COLOR_FAVORITE;
        return COLOR_DEFAULT;
    }

    #restyleAll(): void {
        for (const [name, marker] of this.#markers) {
            marker.setStyle({ fillColor: this.#colorFor(name) });
        }
    }

    #applyVisibility(): void {
        const layer = this.#layer;
        if (!layer) return;
        for (const [name, marker] of this.#markers) {
            const shouldShow = this.#visible === null || this.#visible.has(name);
            const isShown = layer.hasLayer(marker);
            if (shouldShow && !isShown) layer.addLayer(marker);
            else if (!shouldShow && isShown) layer.removeLayer(marker);
        }
    }

    highlight(name: string): void {
        this.#highlighted = name;
        this.#markers.get(name)?.setStyle({ fillColor: COLOR_HIGHLIGHT });
    }

    unhighlight(name: string): void {
        if (this.#highlighted === name) this.#highlighted = null;
        this.#markers.get(name)?.setStyle({ fillColor: this.#colorFor(name) });
    }

    focusSite(site: Site): void {
        const marker = this.#markers.get(site.name);
        if (!marker) return;
        const popup = marker.getPopup();
        if (popup) popup.options.maxHeight = this.#popupMaxHeight();
        // Let the popup's autoPan bring both the marker and the (possibly tall)
        // popup fully into view. A manual panTo here would center the marker and
        // its animation would cancel autoPan, clipping a tall popup off the top.
        marker.openPopup();
        this.#pulse(marker);
    }

    // Largest popup height that still fits the map, leaving room for the marker
    // offset and autoPan padding.
    #popupMaxHeight(): number {
        const mapHeight = this.#map?.getSize().y ?? 0;
        return Math.max(160, mapHeight - 80);
    }

    // Keep every popup's height cap in sync with the current map size so it is
    // correct whichever way a popup is opened (marker click or focusSite).
    #updatePopupHeights(): void {
        const maxHeight = this.#popupMaxHeight();
        for (const marker of this.#markers.values()) {
            const popup = marker.getPopup();
            if (popup) popup.options.maxHeight = maxHeight;
        }
    }

    // Briefly grow and shrink a marker twice — the vector-marker replacement for
    // the old Google Maps marker bounce.
    #pulse(marker: L.CircleMarker): void {
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

    #buildPopup(site: Site): HTMLDivElement {
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
    async #pullImages(wikipediaID: number, imagesContainer: HTMLElement): Promise<void> {
        const timeout = !this.#warnedWikipedia
            ? setTimeout(() => {
                  this.#warnedWikipedia = true;
                  this.#emit('wikipedia-error');
              }, 3000)
            : undefined;

        try {
            const params = new URLSearchParams({
                action: 'query',
                pageids: String(wikipediaID),
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

    async #resolveImageURL(imageName: string, imagesContainer: HTMLElement): Promise<void> {
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
