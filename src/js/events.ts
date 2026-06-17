import type { Site } from './sites.js';

/**
 * The custom events that flow up from the components to <oldtown-app>, mapped to
 * their `CustomEvent` detail type. `void` means the event carries no detail.
 *
 * This is the single source of truth for the app's event contract: `Component.emit`
 * is typed against it (so emitting the wrong detail for an event name is a compile
 * error), and listeners can type their handlers with `OldtownEvent<'name'>`.
 */
export interface OldtownEventMap {
    'toggle-sidebar': void;
    'search-change': string;
    'toggle-favorites': void;
    'site-select': Site;
    'favorite-toggle': Site;
    'site-hover': Site;
    'site-unhover': Site;
    'wikipedia-error': void;
    'tile-error': void;
    dismiss: void;
}

/** Trailing arguments to `emit(name, …)`: events whose detail is `void` take none. */
export type EmitArgs<K extends keyof OldtownEventMap> =
    OldtownEventMap[K] extends void ? [] : [detail: OldtownEventMap[K]];

/** The `CustomEvent` delivered for a given event name. */
export type OldtownEvent<K extends keyof OldtownEventMap> = CustomEvent<OldtownEventMap[K]>;
