import { render, type TemplateResult } from 'lit-html';
import type { EmitArgs, OldtownEventMap } from './events.js';

/** Generic constructor type, used by the {@link reactiveProps} mixin. */
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Minimal base class for custom elements that render with lit-html into a shadow root.
 *
 * Reactive properties are added with the {@link reactiveProps} mixin; subclasses
 * implement `template()` returning a lit-html `TemplateResult`.
 *
 * Renders are batched on the microtask queue so setting several properties in a single
 * turn only triggers one render — the role Knockout's dependency tracking used to play.
 */
export class Component extends HTMLElement {
    // `attachShadow({ mode: 'open' })` in the constructor guarantees this is set.
    declare readonly shadowRoot: ShadowRoot;

    private _renderScheduled = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

    /**
     * Dispatch a composed CustomEvent that crosses shadow boundaries to ancestors.
     * Typed against {@link OldtownEventMap}: the event name fixes the detail type,
     * and `void` events take no second argument.
     */
    emit<K extends keyof OldtownEventMap>(type: K, ...args: EmitArgs<K>): void;
    emit(type: string, ...args: unknown[]): void {
        this.dispatchEvent(new CustomEvent(type, { detail: args[0], bubbles: true, composed: true }));
    }

    /** Subclasses override this to return a lit-html template. */
    template(): TemplateResult | null {
        return null;
    }
}

/**
 * Mixin that adds reactive properties to a {@link Component} subclass: assigning to any
 * of them stores the value and schedules a re-render. The `defaults` object is the single
 * source of truth — its keys and value types become the element's typed properties, so a
 * renamed or mistyped property is a compile error. (The previous `static observedProps`
 * string list could silently drift from the declared fields; this can't.)
 *
 *     class AppNavbar extends reactiveProps(Component, { open: false }) {
 *         template() { return html`…${this.open}…`; } // this.open is typed `boolean`
 *     }
 */
export function reactiveProps<TBase extends Constructor<Component>, P extends Record<string, unknown>>(
    Base: TBase,
    defaults: P,
): TBase & Constructor<P> {
    // Per-instance value store, keyed off the element so the prototype accessors below
    // stay shared. Defined in the closure so no backing field leaks onto the element.
    const store = new WeakMap<Component, Record<string, unknown>>();

    class WithReactiveProps extends Base {
        constructor(...args: any[]) {
            super(...args);
            store.set(this, { ...defaults });
        }
    }

    for (const key of Object.keys(defaults)) {
        Object.defineProperty(WithReactiveProps.prototype, key, {
            configurable: true,
            enumerable: true,
            get(this: Component): unknown {
                return store.get(this)?.[key];
            },
            set(this: Component, value: unknown) {
                const props = store.get(this);
                if (props) props[key] = value;
                this.requestRender();
            },
        });
    }

    return WithReactiveProps as unknown as TBase & Constructor<P>;
}
