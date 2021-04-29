<script lang="ts">
import Footer from './components/Footer.svelte';
import Options from './components/Options.svelte';
import Suppliers from './components/Suppliers.svelte';
import Consult from './components/Consult.svelte';
import Change from './components/Change.svelte';
import Grafic from './components/Grafic.svelte';
import { copy } from './stores';

$: {
  if ($copy) {
    setTimeout(() => {
      copy.set(false);
    }, 2500);
  }
}
</script>

<main class="container px-auto pt-5">
  <div class="flex justify-center">
    <img src="./images/logo.png" alt="Lechugas^2" class="w-60 md:w-96" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 mx-5 md:-mx-10 lg:mx-0 my-5">
    <Options />
    <Consult />
    <Change />
    <Grafic />
    <Suppliers />
  </div>
  <div
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-background-title opacity-75 shadow-2xl {$copy
      ? 'absolute'
      : 'hidden'}">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell" />
    </span>
    <span class="inline-block align-middle mr-8 ">
      <b class="capitalize text-title ">Copiado!</b> Precio de la lechuga copiado
      en el portapapeles.
    </span>
    <button
      class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
      <span on:click={() => copy.set(false)}>×</span>
    </button>
  </div>
</main>
