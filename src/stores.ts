import { writable } from 'svelte/store';

export const optionSelected = writable('');

export const supplierSelected = writable(null);

export const history = writable(false);

export const urlBase = writable('https://lechugas2.herokuapp.com/api/v1');

export const copy = writable(false);

export const dataSuppliers = writable({
  labels: [],
  series: [[], [], [], [], [], []],
});
