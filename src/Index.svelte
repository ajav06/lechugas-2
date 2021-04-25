<script lang="ts">
import Options from './components/Options.svelte';
import Suppliers from './components/Suppliers.svelte';
import Consult from './components/Consult.svelte';
import Change from './components/Change.svelte';
</script>

<main class="container px-auto pt-5">
  <div class="flex justify-center">
    <img src="./images/logo.png" alt="Lechugas^2" class="w-60 md:w-96" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 mx-5 md:mx-0 my-5">
    <Options />
    <Change />
    <Suppliers />
  </div>
</main>
