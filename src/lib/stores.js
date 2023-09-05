import { writable } from 'svelte/store';
export const toggleHistory = writable(false);
export const toggleNew = writable(false);