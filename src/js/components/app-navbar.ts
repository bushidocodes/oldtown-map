import { html, type TemplateResult } from 'lit-html';
import { Component } from '../base.js';

/**
 * Top navigation bar with the app title and a hamburger button that toggles the
 * sidebar drawer. Emits `toggle-sidebar` on click.
 */
export class AppNavbar extends Component {
    static observedProps = ['open'];
    declare open: boolean;

    template(): TemplateResult {
        return html`
            <style>
                :host {
                    display: block;
                    background: #1d1d1d;
                    color: #fff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
                }
                .bar {
                    display: flex;
                    align-items: center;
                    height: 52px;
                    padding: 0 12px;
                }
                .hamburger {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 34px;
                    height: 34px;
                    padding: 0;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .hamburger span {
                    display: block;
                    height: 3px;
                    width: 100%;
                    background: #fff;
                    border-radius: 2px;
                    transition: transform 0.3s, opacity 0.3s;
                }
                :host([data-open]) .hamburger span:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }
                :host([data-open]) .hamburger span:nth-child(2) {
                    opacity: 0;
                }
                :host([data-open]) .hamburger span:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }
                .title {
                    margin-left: 14px;
                    font-size: 18px;
                    font-weight: 600;
                }
            </style>
            <div class="bar">
                <button
                    class="hamburger"
                    aria-label="Toggle navigation"
                    aria-expanded=${this.open ? 'true' : 'false'}
                    @click=${() => this.emit('toggle-sidebar')}
                >
                    <span></span><span></span><span></span>
                </button>
                <span class="title">Old Town Map</span>
            </div>
        `;
    }

    requestRender(): void {
        // Reflect `open` to an attribute so the :host([data-open]) animation works.
        this.toggleAttribute('data-open', !!this.open);
        super.requestRender();
    }
}

customElements.define('app-navbar', AppNavbar);
