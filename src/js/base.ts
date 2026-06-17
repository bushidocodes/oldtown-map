import { render, type TemplateResult } from 'lit-html';

/**
 * Minimal base class for custom elements that render with lit-html into a shadow root.
 *
 * Subclasses:
 *   - declare reactive properties via `static observedProps = ['foo', 'bar']`
 *     (assigning to `this.foo` schedules a re-render), mirror each with a
 *     `declare foo: T;` field so TypeScript knows about the accessor the
 *     constructor defines dynamically, and
 *   - implement `template()` returning a lit-html `TemplateResult`.
 *
 * Renders are batched on the microtask queue so setting several properties in a
 * single turn only triggers one render — the role Knockout's dependency tracking
 * used to play.
 */
export class Component extends HTMLElement {
    static observedProps?: string[];

    // `attachShadow({ mode: 'open' })` in the constructor guarantees this is set.
    declare readonly shadowRoot: ShadowRoot;

    private _props: Record<string, unknown> = {};
    private _renderScheduled = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        for (const name of (this.constructor as typeof Component).observedProps ?? []) {
            Object.defineProperty(this, name, {
                configurable: true,
                enumerable: true,
                get(this: Component) {
                    return this._props[name];
                },
                set(this: Component, value: unknown) {
                    this._props[name] = value;
                    this.requestRender();
                },
            });
        }
    }

    connectedCallback(): void {
        this.requestRender();
    }

    requestRender(): void {
        if (this._renderScheduled) return;
        this._renderScheduled = true;
        queueMicrotask(() => {
            this._renderScheduled = false;
            if (this.isConnected) render(this.template(), this.shadowRoot);
        });
    }

    /** Dispatch a composed CustomEvent that crosses shadow boundaries to ancestors. */
    emit<T = unknown>(type: string, detail?: T): void {
        this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
    }

    /** Subclasses override this to return a lit-html template. */
    template(): TemplateResult | null {
        return null;
    }
}
