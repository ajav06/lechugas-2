<script lang="ts">
import { optionSelected, supplierSelected, dataSuppliers } from '../stores';

let options: object = {
  // // Don't draw the line chart points
  // showPoint: false,
  // // Disable line smoothing
  // lineSmooth: false,
  // // X-Axis specific configuration
  // axisX: {
  //   // We can disable the grid for this axis
  //   showGrid: false,
  //   // and also don't show the label
  //   showLabel: false
  // },
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 60,
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
    labelInterpolationFnc: function (value) {
      return value + ' BsS';
    },
  },
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.

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

    console.log('Este es:', data);
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
