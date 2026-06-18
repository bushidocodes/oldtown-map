import { describe, it, expect } from 'vitest';
import { html } from 'lit-html';
import { Component, reactiveProps } from './base.js';

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

class ReactiveTestEl extends reactiveProps(Component, { label: 'init', count: 0 }) {
    renders = 0;

    template() {
        this.renders += 1;
        return html`<span class="label">${this.label}</span><span class="count">${this.count}</span>`;
    }
}
customElements.define('reactive-test-el', ReactiveTestEl);

function mount(): ReactiveTestEl {
    const el = new ReactiveTestEl();
    document.body.append(el);
    return el;
}

describe('reactiveProps / Component', () => {
    it('applies the declared defaults and renders into the shadow root', async () => {
        const el = mount();
        await tick();
        expect(el.shadowRoot?.querySelector('.label')?.textContent).toBe('init');
        expect(el.shadowRoot?.querySelector('.count')?.textContent).toBe('0');
        el.remove();
    });

    it('re-renders when a reactive property is assigned', async () => {
        const el = mount();
        await tick();
        el.label = 'updated';
        el.count = 5;
        await tick();
        expect(el.shadowRoot?.querySelector('.label')?.textContent).toBe('updated');
        expect(el.shadowRoot?.querySelector('.count')?.textContent).toBe('5');
        el.remove();
    });

    it('batches multiple synchronous writes into a single render', async () => {
        const el = mount();
        await tick();
        const before = el.renders;
        el.label = 'a';
        el.count = 1;
        el.label = 'b';
        await tick();
        expect(el.renders).toBe(before + 1);
        el.remove();
    });

    it('keeps reactive state independent per instance', async () => {
        const a = mount();
        const b = mount();
        await tick();
        a.label = 'only-a';
        await tick();
        expect(a.shadowRoot?.querySelector('.label')?.textContent).toBe('only-a');
        expect(b.shadowRoot?.querySelector('.label')?.textContent).toBe('init');
        a.remove();
        b.remove();
    });

    it('emit dispatches a composed, bubbling CustomEvent that reaches ancestors', () => {
        const el = mount();
        let received: CustomEvent | undefined;
        const handler = (e: Event) => {
            received = e as CustomEvent;
        };
        document.addEventListener('toggle-sidebar', handler);
        el.emit('toggle-sidebar');
        document.removeEventListener('toggle-sidebar', handler);
        expect(received).toBeDefined();
        expect(received?.bubbles).toBe(true);
        expect(received?.composed).toBe(true);
        el.remove();
    });
});
