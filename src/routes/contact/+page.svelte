<script lang="ts">
    import Forms from '$lib/items/form.svelte';
</script>

<div class="h-[80vh]">
  <!-- TODO: Make extra section of design your own dress -->
</div>

<div class="w-100% h-[90vh] flex items-center justify-center bg-surface-50 dark:bg-surface-800 text-foreground">
  <section id="section4" class="w-full py-12">
    <div class="flex flex-col md:flex-row items-stretch justify-between gap-6 max-w-7xl mx-auto px-4">
      
      <!-- Map Section -->
      <div class="w-full md:w-1/2 h-[60vh] md:h-auto">
        <iframe
          class="w-full h-full border-0 rounded-lg"
          src="https://www.google.com/maps?q=34.29877184193318,35.82028686731903&z=15&output=embed&hl=en"
          title="Google Maps location"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <!-- Form Section -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <div class="w-full max-w-xl">
          <Forms />
        </div>
      </div>

    </div>
  </section>
</div>
