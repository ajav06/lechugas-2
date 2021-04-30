<script lang="ts">
import { optionSelected, supplierSelected, copy } from '../stores';

let supplier: any;

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
  el.value = supplier.precio;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  copy.set(true);
};

$: {
  if ($optionSelected === 'Consultar') {
    let optionContent: Element = document.getElementById('Consultar-option');
    optionContent.classList.remove('hidden');
  } else {
    let optionContent: Element = document.getElementById('Consultar-option');
    if (optionContent) optionContent.classList.add('hidden');
  }

  if ($supplierSelected) supplier = $supplierSelected;
}
</script>

<main
  class="bg-primary md:col-span-2 place-content-center"
  id="Consultar-option">
  <div class="font-comfortaa mt-4 md:0 info-tittle ">Consultar</div>
  <div class="font-comfortaa mt-6 md:mt-16 info-generic-text ">
    El precio de la lechuga es
  </div>
  <div class="text-4xl text-price font-comfortaa font-bold text-center mt-10">
    {supplier ? formatNumber(supplier.precio) : 'Cargando..'} BsS
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
</main>
