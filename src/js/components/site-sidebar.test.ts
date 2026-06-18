import { describe, it, expect } from 'vitest';
import './site-sidebar.js';
import type { SiteSidebar } from './site-sidebar.js';
import type { Site } from '../sites.js';

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

const make = (name: string): Site => ({
    name,
    address: 'addr',
    lat: 38.8,
    lng: -77.04,
    description: 'desc',
    wikipediaID: null,
});

async function mount(sites: Site[], favorites = new Set<string>()): Promise<SiteSidebar> {
    const el = document.createElement('site-sidebar') as SiteSidebar;
    el.sites = sites;
    el.favorites = favorites;
    document.body.append(el);
    await tick();
    return el;
}

describe('<site-sidebar>', () => {
    it('renders one row per site', async () => {
        const el = await mount([make('A'), make('B'), make('C')]);
        expect(el.shadowRoot?.querySelectorAll('site-list-item').length).toBe(3);
        el.remove();
    });

    it('shows an empty state when there are no sites', async () => {
        const el = await mount([]);
        expect(el.shadowRoot?.querySelector('.empty')?.textContent).toContain('No matching sites');
        expect(el.shadowRoot?.querySelectorAll('site-list-item').length).toBe(0);
        el.remove();
    });

    it('emits search-change with the typed value', async () => {
        const el = await mount([make('A')]);
        let value: string | undefined;
        const handler = (e: Event) => {
            value = (e as CustomEvent<string>).detail;
        };
        document.addEventListener('search-change', handler);
        const input = el.shadowRoot?.querySelector('input.search') as HTMLInputElement | null;
        if (input) {
            input.value = 'lee';
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        document.removeEventListener('search-change', handler);
        expect(value).toBe('lee');
        el.remove();
    });

    it('reflects the favorites-only toggle and emits toggle-favorites', async () => {
        const el = await mount([make('A')]);
        el.showFavoritesOnly = true;
        await tick();
        expect(el.shadowRoot?.querySelector('.fav-toggle')?.classList.contains('active')).toBe(true);

        let toggled = false;
        const handler = () => {
            toggled = true;
        };
        document.addEventListener('toggle-favorites', handler);
        (el.shadowRoot?.querySelector('.fav-toggle') as HTMLElement | null)?.click();
        document.removeEventListener('toggle-favorites', handler);
        expect(toggled).toBe(true);
        el.remove();
    });
});
