import { describe, it, expect } from 'vitest';
import { sites } from './sites.js';

describe('sites data', () => {
    it('is a non-empty list', () => {
        expect(sites.length).toBeGreaterThan(0);
    });

    it('has unique names', () => {
        const names = sites.map((s) => s.name);
        expect(new Set(names).size).toBe(names.length);
    });

    it('every site is well-formed and within Old Town Alexandria', () => {
        for (const site of sites) {
            expect(site.name.trim().length).toBeGreaterThan(0);
            expect(site.address.trim().length).toBeGreaterThan(0);
            expect(site.description.trim().length).toBeGreaterThan(0);

            expect(site.lat).toBeGreaterThan(38.7);
            expect(site.lat).toBeLessThan(38.9);
            expect(site.lng).toBeGreaterThan(-77.1);
            expect(site.lng).toBeLessThan(-77.0);

            if (site.wikipediaID !== null) {
                expect(Number.isInteger(site.wikipediaID)).toBe(true);
                expect(site.wikipediaID).toBeGreaterThan(0);
            }
        }
    });
});
