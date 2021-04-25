import { writable } from 'svelte/store';

export const optionSelected = writable('');

export const supplierSelected = writable(null);

export const history = writable(false);
