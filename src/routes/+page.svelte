<script lang='ts'>
  import filler_txt from '$lib/filler_text/2_p_filler_text.json';
  import Forms from '$lib/items/form.svelte';
  import Card from '$lib/items/card.svelte';
  import Dress from '$lib/dress.json';
  import { onMount, onDestroy } from 'svelte';
  import { linear } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { fly } from 'svelte/transition';

  let activeSection = $state<string | null>(null); // Stores the ID of the currently active section

  // Define your sections and corresponding button IDs
  const sections = [
    { id: 'Section_Lara_Nassif', buttonId: 'button_nav_Lara_Nassif' },
    { id: 'section2', buttonId: 'button2' },
    { id: 'section3', buttonId: 'button3' },
    { id: 'section4', buttonId: 'button4' },
    { id: 'section5', buttonId: 'button5' },
  ];

  let showAll = $state(false);
  let cards = Dress; // Use the actual array of card data


    function handleScroll() {
    // GUARD: Only access window/document if it exists (i.e., on the client-side)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Check middle of viewport

      for (const section of sections) {
        const el = document.getElementById(section.id); // document.getElementById also needs guarding
        if (el) {
          if (scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
            activeSection = section.id;
            return; // Exit once the active section is found
          }
        }
      }
      activeSection = null; // No section is currently active
    }
  }


  onMount(() => {
   if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once on mount to set initial state
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

function scrollToSection(id: string) {
  if (typeof document !== 'undefined') {
    const el = document.getElementById(id);
    if (el) {
      let yOffset = 0;
      console.log("scrollToSection called with id:", id);
      if (id === "Section_Lara_Nassif") {
        yOffset = -120;
      } else {
        yOffset = -50;
      }

      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
</script>


 <nav class="bg-surface-50 dark:bg-surface-800 flex flex-col items-center w-full top-0 sticky z-10">
    <div class="w-full">
      <div class="btn-group flex flex-row items-center justify-center gap-20">
        <button class={`btn-base preset-tonal-surface bg-surface-50 dark:bg-surface-800 transition-all duration-250 ease-in-out text-lg
          ${activeSection === 'Section_Lara_Nassif'
            ? 'border-b text-gray-950 dark:!text-gray-50'
            : 'text-gray-400 dark:text-gray-600'}`}
          onclick={() => scrollToSection('Section_Lara_Nassif')}
          id="button_nav_Lara_Nassif">
            Lara Nassif
        </button>
        <button class={`btn-base preset-tonal-surface bg-surface-50 dark:bg-surface-800 transition-all duration-250 ease-in-out text-lg
          ${activeSection === 'section2'
            ? 'border-b text-gray-950 dark:!text-gray-50'
            : 'text-gray-400 dark:text-gray-600'}`}
          onclick={() => scrollToSection('section2')}
          id="button2">
            Collections
        </button>
        <button class={`btn-base preset-tonal-surface bg-surface-50 dark:bg-surface-800 transition-all duration-250 ease-in-out text-lg
          ${activeSection === 'section3'
            ? 'border-b text-gray-950 dark:!text-gray-50'
            : 'text-gray-400 dark:text-gray-600'}`}          
            onclick={() => scrollToSection('section3')}
            id="button3">
            Spotlight
        </button>
        <button class={`btn-base preset-tonal-surface bg-surface-50 dark:bg-surface-800 transition-all duration-250 ease-in-out text-lg
          ${activeSection === 'section4'
            ? 'border-b text-gray-950 dark:!text-gray-50'
            : 'text-gray-400 dark:text-gray-600'}`}
          onclick={() => scrollToSection('section4')}
          id="button4">
            Appointments
        </button>
      </div>
    </div>  
  </nav>

<div>
  <section id="Section_Lara_Nassif" class="flex-col items-center justify-center py-[5vh]">
    <div class="flex items-center justify-center pb-[5vh]">
      <div class="flex flex-row items-stretch justify-between gap-20 max-w-6xl mx-auto w-full ">
        <img src="home_page_img/sewing.jpg" alt="Lara Sewing" class="h-[75vh] object-cover" />
        <div class="bg-surface-600 flex items-center w-full">
          <p class="text-lg text-justify w-full px-4">{filler_txt.content}</p>
        </div>
        <img src="home_page_img/Lara.jpg" alt="Lara Nassif" class="h-[75vh] object-cover" />
      </div>
    </div>
    <div class="pt-[5vh]">
      <hr class="border-1 rounded-sm bg-surface-900 dark:bg-surface-50 mx-auto" />
      <div class="flex items-center justify-center text-xl rounded-xs my-[5vh] py-[1vh]">
        <p>"Insert funny quote" ~ Lara Nassif</p>
      </div>
      <hr class="border-1 rounded-sm bg-surface-900 dark:bg-surface-50 mx-auto" /> 
    </div>
  </section>

  <section id="section2" class="justify-items-center text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[5vh]">
    {#each cards.filter(card => !card.isHidden) as card, i}
      {#if i < 4 || (showAll && i < 12)}
        <div in:fly={{ y: 50, duration: 700 }} out:fly={{ y: 100, duration: 300 }}>
          <Card id={card.id} imgSrc={card.images[0]} title={card.name} />
        </div>
      {/if}
    {/each}
    <div class="flex flex-col text-center items-center justify-center mt-4 col-span-full w-full">
      <div class="flex text-center items-center justify-center mt-4 col-span-full w-full">
        <hr class="border-1 rounded-sm bg-surface-900 dark:bg-surface-50 mx-auto my-[5vh] w-full" />
        <button type='button' onclick={() => showAll = !showAll} class="btn btn-lg px-4 py-2 rounded">
          {showAll ? 'Show Less' : 'Show More'}
        </button>
        <hr class="border-1 rounded-sm bg-surface-900 dark:bg-surface-50 mx-auto my-[5vh] w-full" />
      </div>
    </div>
  </section>

  <section id="section3" class="h-[800px] flex items-center justify-center bg-yellow-200 dark:bg-yellow-700 text-3xl">
    Section 3 Content
  </section>

  <section id="section4" class="flex items-center justify-center h-[95vh]">
    <div class="flex flex-row justify-between w-full">
      <div class="flex items-center justify-center w-full max-w-xl"> 
          <Forms /> 
      </div>
      <div class="flex h-[80vh] w-[50vw]">
          <iframe
          class="w-full h-full border-0 rounded-lg"
          src="https://www.google.com/maps?q=34.29877184193318,35.82028686731903&z=15&output=embed&hl=en"
          title="Google Maps location"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
    </div>
  </section>
</div>