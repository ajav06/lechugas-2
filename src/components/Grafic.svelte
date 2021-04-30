<script lang="ts">
import { optionSelected, supplierSelected, dataSuppliers } from '../stores';

// let resetFnc: any;
// const onZoom = (chart, reset) => {
//   resetFnc = reset;
// };
let options: object = {
  axisY: {
    offset: 60,
    labelInterpolationFnc: (value: number) => {
      let aux = value.toString();

      return aux.substring(0, aux.length - 3) + ' BsS';
    },
  },
  plugins: [
    Chartist.plugins.tooltip(),
    Chartist.plugins.zoom({
      onZoom: function (chart, reset) {
        storeReset(reset);
      },
    }),
  ],
};

let supplier: object;

$: {
  if ($optionSelected === 'Historial') {
    let optionContent: Element = document.getElementById('Historial-option');
    optionContent.classList.remove('hidden');
    // setTimeout(() => {
    //   new Chartist.Line('.ct-chart', data, options);
    // }, 100);
  } else {
    let optionContent: Element = document.getElementById('Historial-option');
    if (optionContent) optionContent.classList.add('hidden');
  }

  if ($supplierSelected) supplier = $supplierSelected;

  if ($dataSuppliers) {
    let data: any = $dataSuppliers;

    setTimeout(() => {
      new Chartist.Line('.ct-chart', data, options);
    }, 1000);
  }
}
</script>

<main
  class="bg-primary md:col-span-2 grid grid-cols-1 hidden"
  id="Historial-option">
  <div class="flex justify-center ">
    <div class="ct-chart ct-perfect-fourth self-center max-h-96" />
  </div>
</main>
