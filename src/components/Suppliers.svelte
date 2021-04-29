<style>
@media (max-width: 768px) {
  input {
    margin-left: 0 !important;
  }
}
</style>

<script lang="ts">
import { supplierSelected, history, urlBase } from '../stores';

let suppliers: any[] = [];

fetch(`${$urlBase}/proveedores/`)
  .then((res) => res.json())
  .then((res) => (suppliers = res.data))
  .catch((e) => console.log(e));

const consultarPrecio = (id: number | string) => {
  return fetch(`${$urlBase}/dolares/${id}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

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

const activarProveedor = async (id: number, nombre: string, url: string) => {
  let seleted: any = await consultarPrecio(id);
  seleted.url = url;
  seleted.nombre = nombre;
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

$: {
  if (suppliers.length > 0)
    activarProveedor(suppliers[0].id, suppliers[0].nombre, suppliers[0].url);
}
</script>

<main class="suppliers">
  <div class="title-suppliers-1">
    <span class="text-suppliers font-comfortaa"> Proveedores </span>
  </div>

  {#each suppliers as { nombre, img, id, url }}
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

    {#if id === 1}
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
