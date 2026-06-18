import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Build output is generated, never linted.
    { ignores: ['dist'] },

    js.configs.recommended,
    tseslint.configs.recommended,

    // Application code runs in the browser.
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            globals: globals.browser,
        },
    },

    // Tooling/config files run in Node.
    {
        files: ['vite.config.ts', 'eslint.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
);
