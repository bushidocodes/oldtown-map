import { html, type TemplateResult } from 'lit-html';
import { Component, reactiveProps } from '../base.js';
import './site-list-item.js';
import type { Site } from '../sites.js';

/**
 * Sidebar content: heading, search box, favorites toggle, and the filtered list
 * of sites. The list items' events (`site-select`, `favorite-toggle`,
 * `site-hover`, `site-unhover`) are composed and bubble straight through to
 * <oldtown-app>, so this component only needs to own search + favorites toggle.
 *
 * Props:
 *   - sites: Site[]        already-filtered list to display
 *   - favorites: Set<string>  names of favorited sites
 *   - searchString: string
 *   - showFavoritesOnly: boolean
 *
 * Emits: `search-change` (detail: string), `toggle-favorites`.
 */
export class SiteSidebar extends reactiveProps(Component, {
    sites: [] as Site[],
    favorites: new Set<string>(),
    searchString: '',
    showFavoritesOnly: false,
}) {
    template(): TemplateResult {
        const sites = this.sites;
        const favorites = this.favorites;
        return html`
            <style>
                :host {
                    display: block;
                    height: 100%;
                    background: #1d1d1d;
                    color: #eee;
                    overflow-y: auto;
                }
                .head {
                    padding: 16px 18px 8px;
                    font-size: 20px;
                    font-weight: 600;
                }
                .controls {
                    padding: 0 18px 10px;
                }
                input.search {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 7px 10px;
                    border: 1px solid #444;
                    border-radius: 4px;
                    background: #2b2b2b;
                    color: #fff;
                    font-size: 14px;
                }
                input.search::placeholder {
                    color: #999;
                }
                .fav-toggle {
                    margin-top: 8px;
                    padding: 5px 10px;
                    border: 1px solid #555;
                    border-radius: 4px;
                    background: #333;
                    color: #ddd;
                    cursor: pointer;
                    font-size: 13px;
                }
                .fav-toggle.active {
                    background: #ffd700;
                    border-color: #ffd700;
                    color: #1d1d1d;
                    font-weight: 600;
                }
                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .empty {
                    padding: 16px 18px;
                    color: #999;
                    font-style: italic;
                }
            </style>
            <div class="head">Historic Sites</div>
            <div class="controls">
                <input
                    class="search"
                    type="search"
                    placeholder="Search"
                    .value=${this.searchString ?? ''}
                    @input=${(e: Event) =>
                        this.emit('search-change', (e.target as HTMLInputElement).value)}
                />
                <button
                    class="fav-toggle ${this.showFavoritesOnly ? 'active' : ''}"
                    @click=${() => this.emit('toggle-favorites')}
                >
                    &#9733; Favorites
                </button>
            </div>
            ${sites.length === 0
                ? html`<div class="empty">No matching sites</div>`
                : html`<ul>
                      ${sites.map(
                          (site) => html`
                              <li>
                                  <site-list-item
                                      .site=${site}
                                      .favorite=${favorites.has(site.name)}
                                  ></site-list-item>
                              </li>
                          `,
                      )}
                  </ul>`}
        `;
    }
}

customElements.define('site-sidebar', SiteSidebar);
