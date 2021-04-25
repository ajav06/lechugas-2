<style>
input {
  margin-left: 0 !important;
}
</style>

<script lang="ts">
let suppliers: Array<Object> = [
  {
    id: '123',
    nombre: 'DolarToday',
    img: './images/DolarToday.svg',
  },
  {
    nombre: 'Yadio',
    img: './images/yadio.svg',
  },
  {
    nombre: 'BCV',
    img: './images/BCV.svg',
  },
  {
    nombre: 'MonitorDolar',
    img: './images/MonitorDolar.svg',
  },
  {
    nombre: 'LocalBitcoins',
    img: './images/LocalBitcoins.svg',
  },
  {
    nombre: 'Promedio',
    img: './images/promedio.svg',
  },
];

const activarProveedor = (nombre: string) => {
  let suppliersOptions: HTMLCollectionOf<Element> = document.getElementsByClassName(
    'options-suppliers borders-right'
  );

  for (let i = 0; i < suppliersOptions.length; i++) {
    suppliersOptions[i].classList.remove('bg-primary');
  }

  let supplierOption: Element = document.getElementById(nombre);
  supplierOption.classList.add('bg-primary');

  let supplierOptionCheck: Element = document.getElementById(`check-${nombre}`);
  supplierOptionCheck.checked = !supplierOptionCheck.checked;

  let suppliersOptionsChecks: HTMLCollectionOf<Element> = document.getElementsByClassName(
    'check-suppliers'
  );

  for (let i = 0; i < suppliersOptionsChecks.length; i++) {
    if (suppliersOptionsChecks[i].checked)
      console.log(suppliersOptionsChecks[i]);
  }
};
</script>

<main class="suppliers">
  <div class="title-suppliers-1">
    <span class="text-suppliers font-comfortaa"> Proveedores </span>
  </div>

  {#each suppliers as { nombre, img }, index}
    <button
      id={nombre}
      class="options-suppliers borders-right"
      on:click={() => activarProveedor(nombre)}>
      <img src={img} alt={nombre} class="img-suppliers" />

      <input
        type="checkbox"
        class="justify-center ml-0 mt-1 check-suppliers block md:hidden"
        id={`check-${nombre}`}
        on:click={() => activarProveedor(nombre)} />
      <span class="text-options font-comfortaa">
        {nombre}
      </span>
    </button>

    {#if index === 0}
      <span on:click={activarProveedor(nombre)} class="hidden" />
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
