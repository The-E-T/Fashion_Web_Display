<script lang="ts">
  import Card from '$lib/items/card.svelte';
  import Plus from '@lucide/svelte/icons/plus';
  import type { Dress } from '$lib/dressTemplate';
  export let data: { dresses: Dress[]; isAdmin: boolean };
</script>

<!-- TODO: Add filter/search bar -->

<section id="normal-dresses" class="justify-items-center text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[5vh]">
  {#each data.dresses.filter(d => !d.isHidden) as dress (dress.id)}
    <div>
      <Card id={dress.id} imgSrc={dress.images[0]} title={dress.name} />
    </div>
  {/each}
</section>

{#if data.isAdmin}
  <hr class="my-10 dark:border-surface-50 border-surface-800" />
  <section id="hidden-dresses" class="justify-items-center text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[5vh]">
    <h2 class="col-span-full text-center text-4xl mb-8 text-red-600">Hidden Dresses</h2>

    <form method="POST" class="w-full h-full p-4">
      <button
        type="submit"
        name="createNew"
        class="w-full h-full flex flex-col items-center justify-center text-center gap-2 border rounded aspect-[9/16]">
        <Plus class="w-10 h-10 " /><span>Add New</span>
      </button>
    </form>

    {#each data.dresses.filter(d => d.isHidden && d.id > 0) as dress (dress.id)}
      <div>
        <Card id={dress.id} imgSrc={dress.images[0]} title={dress.name} />
      </div>
    {/each}
  </section>
{/if}
