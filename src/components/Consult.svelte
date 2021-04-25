<script lang="ts">
import { optionSelected, supplierSelected } from '../stores';

let supplier: object;

$: {
  if ($optionSelected === 'Consultar') {
    let optionContent: Element = document.getElementById('Consultar-option');
    optionContent.classList.remove('hidden');
  } else {
    let optionContent: Element = document.getElementById('Consultar-option');
    if (optionContent) optionContent.classList.add('hidden');
  }

  if ($supplierSelected) supplier = $supplierSelected;
}
</script>

<main
  class="bg-primary md:col-span-2 place-content-center"
  id="Consultar-option">
  <div class="font-comfortaa mt-4 md:0 info-tittle ">Consultar</div>
  <div class="font-comfortaa mt-6 md:mt-16 info-generic-text ">
    El precio de la lechuga es
  </div>
  <div class="text-4xl text-price font-comfortaa font-bold text-center mt-10">
    {supplier ? supplier.precio : 'Cargando..'} BsS
  </div>
  <div class="font-comfortaa mt-10 info-generic-text">11 de abril del 2021</div>
  <div class="font-comfortaa mt-5 info-generic-text">6:00 pm</div>
  <div class="flex justify-center">
    <button class="font-comfortaa mt-10 copy-btn"> Copiar </button>
  </div>
  {#if supplier && supplier.nombre !== 'Promedio'}
    <div class="flex justify-center">
      <a
        class="font-comfortaa mt-10 text-fuente text-center"
        target="_blank"
        href={supplier.url}>
        Fuente
      </a>
    </div>
  {/if}
</main>
