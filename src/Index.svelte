<script lang="ts">
import Footer from './components/Footer.svelte';
import Options from './components/Options.svelte';
import Suppliers from './components/Suppliers.svelte';
import Consult from './components/Consult.svelte';
import Change from './components/Change.svelte';
import Grafic from './components/Grafic.svelte';
</script>

<main class="container px-auto pt-5">
  <div class="flex justify-center">
    <img src="./images/logo.png" alt="Lechugas^2" class="w-60 md:w-96" />
  </div>
  <p>sadasdsadsad</p>

  <div class="grid grid-cols-1 md:grid-cols-4 mx-5 md:-mx-10 lg:mx-0 my-5">
    <Options />
    <Consult />

    <Change />
    <Grafic />
    <Suppliers />
  </div>
</main>
