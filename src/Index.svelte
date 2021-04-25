<script lang="ts">
import Suppliers from "./components/Suppliers.svelte";
</script>

<main class="container px-auto pt-5">
  <div class="flex justify-center">
    <img
      src="./images/logo.png"
      alt="Lechugas^2"
      class="box-content w-60 md:w-96" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 mx-5 md:mx-0 my-5">
    <div class="bg-primary">1</div>
    <div class="bg-primary md:col-span-2">2</div>
    <Suppliers />
  </div>
</main>
