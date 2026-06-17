import { defineConfig } from 'vite';

// The app is a static single-page site whose source lives in `src/`, so that is
// the Vite root. The production bundle is emitted to `dist/` for GitHub Pages.
// `base: './'` keeps asset URLs relative so the build works under any path
// (GitHub Pages serves project sites from a sub-path like /oldtown-map/).
export default defineConfig({
    root: 'src',
    base: './',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
});
