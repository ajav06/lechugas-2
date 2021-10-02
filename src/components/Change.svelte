<script lang="ts">
import { copy, optionSelected, supplierSelected } from '../stores';

let supplier: any;

let valueBs: number = 1;

let valueDolar: number = 1;

const enableCalculator = (e: any) => {
  if (e.target.id === 'VES') {
    valueBs = e.target.value;
    calculateDolar();
  } else {
    valueDolar = e.target.value;
    calculateBS();
  }
};

const formatNumber = (num: Number) => {
  return num
    .toString()
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const formatDate = (date: string | Date) => {
  let options: object = {
    timeZone: 'America/Caracas',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours() + 4,
    date.getMinutes()
  ).toLocaleString('es-Ve', options);
};

const formatHour = (date: string | Date) => {
  let options: object = {
    timeZone: 'America/Caracas',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(
    0,
    0,
    0,
    date.getHours() + 4,
    date.getMinutes()
  ).toLocaleString('es-VE', options);
};

const copyClipboard = () => {
  /* Get the text field */
  const el = document.createElement('textarea');
  el.value = `${valueDolar} dólares son ${formatNumber(valueBs)} bolívares en ${
    supplier.nombre
  }`;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  copy.set(true);
};

const calculateDolar = () => {
  let aux: string;

  if (valueBs) {
    aux = (valueBs / supplier.precio).toFixed(2);
    valueDolar = parseFloat(aux);
  }
};

const calculateBS = () => {
  let aux: string;

  if (valueDolar && valueDolar > 0) {
    aux = (valueDolar * supplier.precio).toFixed(2);
    valueBs = parseFloat(aux);
  }
};

$: {
  if ($optionSelected === 'Convertir') {
    let optionContent: Element = document.getElementById('Convertir-option');
    optionContent.classList.remove('hidden');
  } else {
    let optionContent: Element = document.getElementById('Convertir-option');
    if (optionContent) optionContent.classList.add('hidden');
  }

  if ($supplierSelected) {
    let aux: string;
    supplier = $supplierSelected;
    aux = (supplier.precio * 1).toFixed(2);
    valueBs = parseFloat(aux);
  }
}
</script>

<main
  class="bg-primary md:col-span-2 place-content-center hidden"
  id="Convertir-option">
  <div class="font-comfortaa mt-4 md:0 info-tittle ">Convertir</div>
  <div class="grid grid-rows-7 text-center ">
    <div class="flex justify-center mt-6 md:mt-16">
      <input
        type="text"
        class="font-comfortaa input-price"
        id="VES"
        value={valueBs}
        on:focus={calculateDolar}
        on:input={enableCalculator} />
      <h1 class="change-coins font-comfortaa">VES</h1>
    </div>
    <div class="info-generic-text font-comfortaa font-bold my-2">=</div>
    <div class="flex justify-center">
      <input
        type="text"
        class="font-comfortaa input-price"
        id="USD"
        value={valueDolar}
        on:focus={calculateBS}
        on:input={enableCalculator} />
      <h1 class="change-coins  font-comfortaa">USD</h1>
    </div>
    <div class="font-comfortaa mt-10 info-generic-text">
      {supplier ? formatDate(new Date(supplier.fecha)) : '- de - del -'}
    </div>
    <div class="font-comfortaa mt-5 info-generic-text">
      {supplier ? formatHour(new Date(supplier.fecha)) : '-:- pm'}
    </div>

    <div class="flex justify-center">
      <button
        class="font-comfortaa mt-10 copy-btn flex"
        on:click={() => copyClipboard()}>
        <img
          src="./images/copy-regular.svg"
          alt="Copiar"
          class="w-5 mr-2"
          style="color: aqua;" />
        Copiar
      </button>
    </div>
    {#if supplier && supplier.nombre !== 'Promedio'}
      <div class="flex justify-center">
        <a
          class="font-comfortaa text-fuente text-center"
          target="_blank"
          href={supplier.url}>
          Fuente
        </a>
      </div>
    {/if}
  </div>
</main>
