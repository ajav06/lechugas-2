<style>
@media (max-width: 768px) {
  input {
    margin-left: 0 !important;
  }
}
</style>

<script lang="ts">
import { supplierSelected, history, urlBase, dataSuppliers } from '../stores';

let suppliers: any[] = [];

let data: any = {
  labels: [],
  series: [[], [], [], [], [], []],
};

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

const consultarHistorial = async (id: number | string) => {
  return fetch(`${$urlBase}/dolares/historial/${id}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

const asignarLabels = async (id: number | string) => {
  let response = await consultarHistorial(id);
  data.labels = response.fechas;
};

const crearGrafica = async (id: number) => {
  if (data.series[id - 1].length > 0) {
    data.series[id - 1] = [];
  } else {
    let response = await consultarHistorial(id);
    data.series[id - 1] = [...new Set(response.precios.map((i: any) => i))];
  }
};

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

    asignarLabels(id);
    crearGrafica(id);
    dataSuppliers.set(data);

    let suppliersOptionsChecks: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'check-suppliers'
    );

    // for (let i = 0; i < suppliersOptionsChecks.length; i++) {
    //   if (suppliersOptionsChecks[i].checked)
    //     console.log(suppliersOptionsChecks[i]);
    // }
  }
};

const checkbox = async (nombre: string) => {
  let supplierOptionCheck: Element = document.getElementById(`check-${nombre}`);
  supplierOptionCheck.checked = !supplierOptionCheck.checked;
  //   let suppliersOptionsChecks: HTMLCollectionOf<Element> = document.getElementsByClassName(
  //     'check-suppliers'
  //   );
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

      <!-- <input
        type="checkbox"
        class="justify-self-center form-checkbox text-gray-600 ml-0 mt-1 md:mt-0 self-center check-suppliers {$history
          ? ''
          : 'hidden'}"
        id={`check-${nombre}`}
        on:click={() => checkbox(nombre)} /> -->
      <input
        type="checkbox"
        class="form-checkbox text-gray-600 justify-self-center ml-0 mt-1 md:mt-0 self-center check-suppliers {$history
          ? ''
          : 'hidden'}"
        id={`check-${nombre}`}
        on:click={() => checkbox(nombre)} />
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
