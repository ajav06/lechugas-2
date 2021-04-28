<style>
@media (max-width: 768px) {
  input {
    margin-left: 0 !important;
  }
}
</style>

<script lang="ts">
import { supplierSelected, history } from '../stores';

let suppliers: Array<Object> = fetch(
  'https://lechugas2.herokuapp.com/api/v1/proveedores/'
);

// let suppliers: Array<Object> = [
//   {
//     id: 0,
//     nombre: 'DolarToday',
//     img: './images/DolarToday.svg',
//     url: 'https://dolartoday.com/',
//   },
//   {
//     id: 1,
//     nombre: 'Yadio',
//     img: './images/yadio.svg',
//     url: 'https://yadio.io/',
//   },
//   {
//     id: 2,
//     nombre: 'BCV',
//     img: './images/BCV.svg',
//     url: 'http://www.bcv.org.ve/',
//   },
//   {
//     id: 3,
//     nombre: 'MonitorDolar',
//     img: './images/MonitorDolar.svg',
//     url: 'https://www.instagram.com/enparalelovzla/',
//   },
//   {
//     id: 4,
//     nombre: 'LocalBitcoins',
//     img: './images/LocalBitcoins.svg',
//     url: 'https://localbitcoins.com/',
//   },
//   {
//     id: 5,
//     nombre: 'Promedio',
//     img: './images/promedio.svg',
//     url: 'https://google.co.ve',
//   },
// ];

let dolar: Array<Object> = [
  {
    nombre: 'DolarToday',
    precio: '2456123,04',
    fecha: new Date(),
  },
  {
    nombre: 'Yadio',
    precio: '2456223,04',
    fecha: new Date(),
  },
  {
    nombre: 'BCV',
    precio: '2456323,04',
    fecha: new Date(),
  },
  {
    nombre: 'MonitorDolar',
    precio: '2456423,04',
    fecha: new Date(),
  },
  {
    nombre: 'LocalBitcoins',
    precio: '2456523,04',
    fecha: new Date(),
  },
  {
    nombre: 'Promedio',
    precio: '2456623,04',
    fecha: new Date(),
  },
];

const activarProveedor = (id: number, nombre: string, url: string) => {
  let seleted = dolar.find((i) => i.nombre === nombre);
  seleted.url = url;
  supplierSelected.set(seleted);

  let suppliersOptions: HTMLCollectionOf<Element> = document.getElementsByClassName(
    'options-suppliers borders-right'
  );

  for (let i = 0; i < suppliersOptions.length; i++) {
    suppliersOptions[i].classList.remove('bg-primary');
  }

  let supplierOption: Element = document.getElementById(nombre);
  supplierOption.classList.add('bg-primary');

  if ($history) {
    let supplierOptionCheck: Element = document.getElementById(
      `check-${nombre}`
    );
    supplierOptionCheck.checked = !supplierOptionCheck.checked;

    let suppliersOptionsChecks: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'check-suppliers'
    );

    // for (let i = 0; i < suppliersOptionsChecks.length; i++) {
    //   if (suppliersOptionsChecks[i].checked)
    //     console.log(suppliersOptionsChecks[i]);
    // }
  }
};
</script>

<main class="suppliers">
  <div class="title-suppliers-1">
    <span class="text-suppliers font-comfortaa"> Proveedores!!!! </span>
  </div>

  {#each suppliers as { nombre, img, id, url }, index}
    <button
      id={nombre}
      class="options-suppliers borders-right"
      on:click={() => activarProveedor(id, nombre, url)}>
      <img src={img} alt={nombre} class="img-suppliers" />

      <span class="text-options font-comfortaa">
        {nombre}
      </span>

      <input
        type="checkbox"
        class="justify-self-center ml-0 mt-1 md:mt-0 self-center check-suppliers {$history
          ? ''
          : 'hidden'}"
        id={`check-${nombre}`}
        on:click={() => activarProveedor(id, nombre, url)} />
    </button>

    {#if index === 0}
      <span on:click={activarProveedor(id, nombre, url)} class="hidden" />
    {/if}
  {:else}
    <div class="options-suppliers borders-right">
      <span class="text-options font-comfortaa"> Cargando Proveedores... </span>
    </div>
  {/each}

  <div class="title-suppliers-2">
    <span class="text-suppliers font-comfortaa"> Proveedores </span>
  </div>
</main>
