import { render } from 'lit-html';

/**
 * Minimal base class for custom elements that render with lit-html into a shadow root.
 *
 * Subclasses:
 *   - declare reactive properties via `static observedProps = ['foo', 'bar']`
 *     (assigning to `this.foo` schedules a re-render), and
 *   - implement `template()` returning a lit-html `TemplateResult`.
 *
 * Renders are batched on the microtask queue so setting several properties in a
 * single turn only triggers one render — the role Knockout's dependency tracking
 * used to play.
 */
export class Component extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._props = {};
        this._renderScheduled = false;

        for (const name of this.constructor.observedProps ?? []) {
            Object.defineProperty(this, name, {
                configurable: true,
                enumerable: true,
                get() {
                    return this._props[name];
                },
                set(value) {
                    this._props[name] = value;
                    this.requestRender();
                },
            });
        }
    }

    connectedCallback() {
        this.requestRender();
    }

    requestRender() {
        if (this._renderScheduled) return;
        this._renderScheduled = true;
        queueMicrotask(() => {
            this._renderScheduled = false;
            if (this.isConnected) render(this.template(), this.shadowRoot);
        });
    }

    /** Dispatch a composed CustomEvent that crosses shadow boundaries to ancestors. */
    emit(type, detail) {
        this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
    }

    /** Subclasses override this to return a lit-html template. */
    template() {
        return null;
    }
}
