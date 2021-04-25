<script lang="ts">
import { optionSelected } from '../stores';

$: {
  if ($optionSelected === 'Convertir') {
    let optionContent: Element = document.getElementById('Convertir-option');
    optionContent.classList.remove('hidden');
  } else {
    let optionContent: Element = document.getElementById('Convertir-option');
    if (optionContent) optionContent.classList.add('hidden');
  }
}
</script>

<main
  class="bg-primary md:col-span-2 place-content-center hidden"
  id="Convertir-option">
  <div class="font-comfortaa mt-4 md:0 info-tittle ">Convertir</div>
  <div class="grid grid-rows-7 text-center ">
    <div class="flex justify-center mt-6 md:mt-16">
      <input type="text" class="font-comfortaa input-price" />
      <h1 class="change-coins font-comfortaa">VES</h1>
    </div>
    <div class="info-generic-text font-comfortaa font-bold my-2">=</div>
    <div class="flex justify-center">
      <input type="text" class="font-comfortaa input-price" />
      <h1 class="change-coins  font-comfortaa">USD</h1>
    </div>
    <div class="font-comfortaa mt-10 info-generic-text">
      11 de abril del 2021
    </div>
    <div class="font-comfortaa mt-5 info-generic-text">6:00 pm</div>
    <div class="flex justify-center">
      <button class="font-comfortaa mt-10 copy-btn"> Copiar </button>
    </div>
    <div class="font-comfortaa mt-10 text-fuente ">Fuente</div>
  </div>
</main>
