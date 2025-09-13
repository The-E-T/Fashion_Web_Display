<script lang="ts">
  import "../../app.css";
  export let id: number;
  export let imgSrc: string;
  export let title: string;
</script>

<a
  href={`/dress/${id}`}
  class="group card block w-full max-w-ms scale-95 hover:scale-100 
         transition-transform duration-300 ease-in-out 
         overflow-hidden"
  aria-label="View details for Name of Dress"
>
  <!-- Image -->
  <div class="aspect-[9/16] w-full">
    <img
      src={imgSrc}
      alt={title}
      class="h-full w-full object-cover"
    />
  </div>

  <!-- Footer Overlay (appears on hover) -->
  <div
    class="absolute bottom-0 left-0 right-0 
           flex items-center justify-center p-2 opacity-0 translate-y-4 
           group-hover:opacity-100 group-hover:translate-y-0 
           transition-all duration-300 ease-in-out transform opacity pointer-events-none
           group-hover:pointer-events-auto"
  >
    <button type="button" class="btn preset-tonal-surface">{title}</button>
  </div>
</a>
