import { describe, it, expect } from 'vitest';
import './site-list-item.js';
import type { SiteListItem } from './site-list-item.js';
import type { Site } from '../sites.js';

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

const sampleSite: Site = {
    name: 'Test Site',
    address: '1 Main St, Alexandria, VA',
    lat: 38.8,
    lng: -77.04,
    description: 'A place worth visiting.',
    wikipediaID: null,
};

async function mount(site: Site, favorite = false): Promise<SiteListItem> {
    const el = document.createElement('site-list-item') as SiteListItem;
    el.site = site;
    el.favorite = favorite;
    document.body.append(el);
    await tick();
    return el;
}

describe('<site-list-item>', () => {
    it('renders the site name', async () => {
        const el = await mount(sampleSite);
        expect(el.shadowRoot?.querySelector('.name')?.textContent).toBe('Test Site');
        el.remove();
    });

    it('marks the star only when favorited', async () => {
        const fav = await mount(sampleSite, true);
        expect(fav.shadowRoot?.querySelector('.star')?.classList.contains('fav')).toBe(true);
        fav.remove();

        const plain = await mount(sampleSite, false);
        expect(plain.shadowRoot?.querySelector('.star')?.classList.contains('fav')).toBe(false);
        plain.remove();
    });

    it('emits site-select with the site when the row is clicked', async () => {
        const el = await mount(sampleSite);
        let detail: Site | undefined;
        const handler = (e: Event) => {
            detail = (e as CustomEvent<Site>).detail;
        };
        document.addEventListener('site-select', handler);
        (el.shadowRoot?.querySelector('.row') as HTMLElement | null)?.click();
        document.removeEventListener('site-select', handler);
        expect(detail).toEqual(sampleSite);
        el.remove();
    });

    it('emits favorite-toggle but not site-select when the star is clicked', async () => {
        const el = await mount(sampleSite);
        let favToggled = false;
        let selected = false;
        const onFav = () => {
            favToggled = true;
        };
        const onSelect = () => {
            selected = true;
        };
        document.addEventListener('favorite-toggle', onFav);
        document.addEventListener('site-select', onSelect);
        (el.shadowRoot?.querySelector('.star') as HTMLElement | null)?.click();
        document.removeEventListener('favorite-toggle', onFav);
        document.removeEventListener('site-select', onSelect);
        expect(favToggled).toBe(true);
        expect(selected).toBe(false); // stopPropagation keeps the row from also selecting
        el.remove();
    });
});
