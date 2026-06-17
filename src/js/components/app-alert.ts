import { html, type TemplateResult } from 'lit-html';
import { Component, reactiveProps } from '../base.js';

/**
 * Dismissible warning banner that floats over the top-left of the map.
 * Props: message (string). Emits `dismiss` when the close button is clicked.
 */
export class AppAlert extends reactiveProps(Component, { message: '' }) {
    template(): TemplateResult {
        return html`
            <style>
                :host {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 800;
                    max-width: 90%;
                }
                .alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 10px;
                    padding: 10px 14px;
                    background: #fcf2cf;
                    border: 1px solid #e6d27a;
                    border-radius: 4px;
                    color: #6b5900;
                    font-size: 14px;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
                }
                button {
                    border: none;
                    background: none;
                    font-size: 18px;
                    line-height: 1;
                    cursor: pointer;
                    color: #6b5900;
                }
            </style>
            <div class="alert" role="alert">
                <span><strong>Warning!</strong> ${this.message}</span>
                <button aria-label="Close" @click=${() => this.emit('dismiss')}>&times;</button>
            </div>
        `;
    }
}

customElements.define('app-alert', AppAlert);
