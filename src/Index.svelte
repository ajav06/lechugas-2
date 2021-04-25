<script lang="ts">
import Options from "./components/Options.svelte";
import Suppliers from "./components/Suppliers.svelte";
</script>

<main class="container px-auto pt-5">
  <div class="flex justify-center">
    <img
      src="./images/logo.png"
      alt="Lechugas^2"
      class="box-content w-60 md:w-96" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 md:mx-10 my-5 rounded-md">
    <Options />
    <div class="bg-primary">1</div>
    <div class="bg-primary md:col-span-2">2</div>
    <Suppliers />
  </div>
</main>
