import { defineConfig } from 'vitest/config';

// The components render into shadow DOM and dispatch DOM events, so tests run in a
// jsdom environment. Test files live next to the code they cover as `*.test.ts`.
export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['src/**/*.test.ts'],
    },
});
