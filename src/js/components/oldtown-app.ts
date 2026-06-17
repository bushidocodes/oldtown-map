import { html, type TemplateResult } from 'lit-html';
import { Component } from '../base.js';
import { sites, type Site } from '../sites.js';
import './app-navbar.js';
import './site-sidebar.js';
import './app-alert.js';
import './map-view.js';
import type { MapView } from './map-view.js';
import type { OldtownEvent } from '../events.js';

const FAVORITES_KEY = 'oldtown-favorites';
// Below this viewport width, selecting a site auto-closes the drawer so the
// popup is visible (mirrors the old `$(window).width() < 1500` behavior).
const AUTOCLOSE_WIDTH = 1500;

/**
 * Root component. Owns all application state, derives the filtered site list,
 * persists favorites, and coordinates the sidebar and map.
 */
export class OldtownApp extends Component {
    #sites: Site[] = sites;
    #favorites = new Set<string>(this.#loadFavorites());
    #searchString = '';
    #showFavoritesOnly = false;
    #sidebarOpen = false;
    #wikipediaWarning = false;
    #tileWarning = false;

    #loadFavorites(): string[] {
        try {
            const parsed: unknown = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]');
            return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
        } catch {
            return [];
        }
    }

    #saveFavorites(): void {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...this.#favorites]));
    }

    get #filteredSites(): Site[] {
        let result = this.#showFavoritesOnly
            ? this.#sites.filter((s) => this.#favorites.has(s.name))
            : this.#sites;
        const query = this.#searchString.trim().toLowerCase();
        if (query) {
            result = result.filter((s) => s.name.toLowerCase().includes(query));
        }
        return result;
    }

    get #mapView(): MapView | null {
        return this.shadowRoot.querySelector<MapView>('map-view');
    }

    // --- event handlers -----------------------------------------------------

    #onSearchChange = (e: OldtownEvent<'search-change'>): void => {
        this.#searchString = e.detail;
        this.requestRender();
    };

    #onToggleFavorites = (): void => {
        this.#showFavoritesOnly = !this.#showFavoritesOnly;
        this.requestRender();
    };

    #onToggleSidebar = (): void => {
        this.#sidebarOpen = !this.#sidebarOpen;
        this.requestRender();
    };

    #onCloseSidebar = (): void => {
        this.#sidebarOpen = false;
        this.requestRender();
    };

    #onSiteSelect = (e: OldtownEvent<'site-select'>): void => {
        const site = e.detail;
        if (window.innerWidth < AUTOCLOSE_WIDTH) {
            this.#sidebarOpen = false;
            this.requestRender();
        }
        this.#mapView?.focusSite(site);
    };

    #onFavoriteToggle = (e: OldtownEvent<'favorite-toggle'>): void => {
        const { name } = e.detail;
        if (this.#favorites.has(name)) this.#favorites.delete(name);
        else this.#favorites.add(name);
        this.#saveFavorites();
        this.#favorites = new Set(this.#favorites); // fresh ref so map-view's setter fires
        this.requestRender();
    };

    #onSiteHover = (e: OldtownEvent<'site-hover'>): void => this.#mapView?.highlight(e.detail.name);
    #onSiteUnhover = (e: OldtownEvent<'site-unhover'>): void => this.#mapView?.unhighlight(e.detail.name);

    #onWikipediaError = (): void => {
        this.#wikipediaWarning = true;
        this.requestRender();
    };

    #onTileError = (): void => {
        this.#tileWarning = true;
        this.requestRender();
    };

    template(): TemplateResult {
        const filtered = this.#filteredSites;
        const visibleNames = new Set(filtered.map((s) => s.name));
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                app-navbar {
                    flex: 0 0 auto;
                }
                .body {
                    position: relative;
                    flex: 1 1 auto;
                    overflow: hidden;
                }
                main {
                    position: absolute;
                    inset: 0;
                }
                map-view {
                    height: 100%;
                    width: 100%;
                }
                .sidebar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 260px;
                    z-index: 1000;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4);
                }
                .sidebar.open {
                    transform: none;
                }
                .overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 900;
                    background: rgba(0, 0, 0, 0.4);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                .overlay.show {
                    opacity: 1;
                    pointer-events: auto;
                }
            </style>
            <app-navbar
                .open=${this.#sidebarOpen}
                @toggle-sidebar=${this.#onToggleSidebar}
            ></app-navbar>
            <div class="body">
                <main>
                    ${this.#wikipediaWarning
                        ? html`<app-alert
                              message="Wikipedia resources are not responding"
                              @dismiss=${() => {
                                  this.#wikipediaWarning = false;
                                  this.requestRender();
                              }}
                          ></app-alert>`
                        : ''}
                    ${this.#tileWarning
                        ? html`<app-alert
                              message="Map tiles are not responding"
                              @dismiss=${() => {
                                  this.#tileWarning = false;
                                  this.requestRender();
                              }}
                          ></app-alert>`
                        : ''}
                    <map-view
                        .sites=${this.#sites}
                        .visibleNames=${visibleNames}
                        .favorites=${this.#favorites}
                        @wikipedia-error=${this.#onWikipediaError}
                        @tile-error=${this.#onTileError}
                    ></map-view>
                </main>
                <div
                    class="overlay ${this.#sidebarOpen ? 'show' : ''}"
                    @click=${this.#onCloseSidebar}
                ></div>
                <aside
                    class="sidebar ${this.#sidebarOpen ? 'open' : ''}"
                    @search-change=${this.#onSearchChange}
                    @toggle-favorites=${this.#onToggleFavorites}
                    @site-select=${this.#onSiteSelect}
                    @favorite-toggle=${this.#onFavoriteToggle}
                    @site-hover=${this.#onSiteHover}
                    @site-unhover=${this.#onSiteUnhover}
                >
                    <site-sidebar
                        .sites=${filtered}
                        .favorites=${this.#favorites}
                        .searchString=${this.#searchString}
                        .showFavoritesOnly=${this.#showFavoritesOnly}
                    ></site-sidebar>
                </aside>
            </div>
        `;
    }
}

customElements.define('oldtown-app', OldtownApp);
