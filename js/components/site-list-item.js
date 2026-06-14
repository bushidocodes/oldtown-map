import { html } from 'lit-html';
import { Component } from '../base.js';

/**
 * A single row in the sidebar site list: a favorite star plus the site name.
 *
 * Emits (all with the site as `detail`, composed so they reach <oldtown-app>):
 *   - `site-select`    when the row is clicked
 *   - `favorite-toggle` when the star is clicked (does not also select)
 *   - `site-hover` / `site-unhover` on pointer enter/leave
 */
export class SiteListItem extends Component {
    static observedProps = ['site', 'favorite'];

    template() {
        const site = this.site;
        if (!site) return html``;
        return html`
            <style>
                :host {
                    display: block;
                }
                .row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 18px;
                    cursor: pointer;
                    color: #ddd;
                    border-bottom: 1px solid #2a2a2a;
                }
                .row:hover {
                    background: #333;
                    color: #fff;
                }
                .star {
                    flex: 0 0 auto;
                    color: #777;
                    font-size: 15px;
                    line-height: 1;
                }
                .star:hover {
                    color: #ffd700;
                }
                .star.fav {
                    color: #ffd700;
                }
                .name {
                    flex: 1 1 auto;
                }
            </style>
            <div
                class="row"
                @click=${() => this.emit('site-select', site)}
                @mouseover=${() => this.emit('site-hover', site)}
                @mouseout=${() => this.emit('site-unhover', site)}
            >
                <span
                    class="star ${this.favorite ? 'fav' : ''}"
                    title="Toggle favorite"
                    @click=${this.#onStarClick}
                    >&#9733;</span
                >
                <span class="name">${site.name}</span>
            </div>
        `;
    }

    #onStarClick = (event) => {
        event.stopPropagation();
        this.emit('favorite-toggle', this.site);
    };
}

customElements.define('site-list-item', SiteListItem);
