<style>
.title-title-option {
  display: block;
}
</style>

<script lang="ts">
import { optionSelected } from '../stores';

let options: Array<Object> = [
  {
    nombre: 'Consultar',
    img: './images/lupa.svg',
  },
  {
    nombre: 'Convertir',
    img: './images/cambio.svg',
  },
  {
    nombre: 'Historial',
    img: './images/historial.svg',
  },
];

const activarOpciones = (opcion) => {
  let optionsOptions: HTMLCollectionOf<Element> = document.getElementsByClassName(
    'option-options borders-left'
  );

  optionSelected.update((n) => opcion);

  for (let i = 0; i < optionsOptions.length; i++) {
    optionsOptions[i].classList.remove('bg-primary');
  }

  let optionOption: Element = document.getElementById(opcion);

  optionOption.classList.add('bg-primary');
};
</script>

<main class="bg-secundary roundear">
  <div class="options ">
    <div class="title-opcions">
      <span class="font-comfortaa title-title-option"> Opciones</span>
    </div>

    {#each options as { nombre, img }, index}
      <button
        id={nombre}
        class="option-options borders-left"
        on:click={() => activarOpciones(nombre)}>
        <img src={img} alt={nombre} class="img-options" />

        <span class="text-options font-comfortaa">
          {nombre}
        </span>
      </button>

      {#if index === 0}
        <span on:click={activarOpciones(nombre)} class="hidden" />
      {/if}
    {:else}
      <div class="option-options borders-left">
        <span class="text-options font-comfortaa">
          Cargando Proveedores...
        </span>
      </div>
    {/each}
    <div />
  </div>
</main>
