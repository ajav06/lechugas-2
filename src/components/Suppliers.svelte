<script lang="ts">
let suppliers: Array<Object> = [
  {
    id: '123',
    nombre: 'Dolar Today',
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
    nombre: 'Monitor Dolar',
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

const activarProveedor = (nombre) => {
  let suppliersOptions: HTMLCollectionOf<Element> = document.getElementsByClassName(
    'options-suppliers borders-right'
  );

  for (let i = 0; i < suppliersOptions.length; i++) {
    suppliersOptions[i].classList.remove('bg-primary');
  }

  let supplierOption: Element = document.getElementById(nombre);
  supplierOption.classList.add('bg-primary');
};
</script>

<main>
  <div class="suppliers">
    <div class="title-suppliers-1">
      <span class="text-suppliers font-comfortaa-semibol"> Proveedores </span>
    </div>

    {#each suppliers as { nombre, img }, index}
      <button
        id={nombre}
        class="options-suppliers borders-right"
        on:click={() => activarProveedor(nombre)}>
        <img src={img} alt={nombre} class="img-suppliers" />
        <span class="text-options font-comfortaa-semibol">
          {nombre}
        </span>
      </button>

      {#if index === 0}
        <span on:click={activarProveedor(nombre)} class="hidden" />
      {/if}
    {:else}
      <div class="options-suppliers borders-right">
        <span class="text-options font-comfortaa-semibol">
          Cargando Proveedores...
        </span>
      </div>
    {/each}

    <div class="title-suppliers-2">
      <span class="text-suppliers font-comfortaa-semibol"> Proveedores </span>
    </div>
  </div>
</main>
