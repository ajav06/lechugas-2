<script lang="ts">
import Index from './Index.svelte';
import Footer from './components/Footer.svelte';
</script>

<main class="h-screen grid grid-flow-row">
  <div class="flex justify-center">
    <Index />
  </div>
  <div class="flex flex-col-reverse">
    <Footer />
  </div>
</main>
