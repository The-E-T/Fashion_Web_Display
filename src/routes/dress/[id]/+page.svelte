<script lang="ts">
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  import IconDropzone from '@lucide/svelte/icons/image-plus';
  import type { Dress } from '$lib/dressTemplate';
	import { onMount } from 'svelte';

  const { data } = $props<{
    data: {
      dress: Dress;
      isAdmin: boolean;
    };
  }>();
  
  let dress = $state(data.isAdmin ? { ...data.dress } : data.dress);
  let editing = $state(false);
 
  let currentIndex = $state(0);

  let newImageFiles: File[] = $state([]);

  let isFullscreen = $state(false);

  $effect(() => {
    if (isFullscreen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  });

  const deleteCurrentImage = () => {
    if (dress.images.length === 0) return;

    dress.images.splice(currentIndex, 1);

    // Fix index if needed
    if (currentIndex >= dress.images.length) {
      currentIndex = Math.max(0, dress.images.length - 1);
    }
  };


  const nextImage = () => {
    currentIndex = (currentIndex + 1) % dress.images.length;
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + dress.images.length) % dress.images.length;
  };

  const selectImage = (index: number) => {
    currentIndex = index;
  };

  function handleFileChange(files: File[]) {
    if (!files || files.length === 0) return;
    newImageFiles = Array.from(files); // Save files for upload on save
  }


  async function saveDress() {
    try {
      const formData = new FormData();
      // Add dress data
      formData.append('dress', JSON.stringify(dress));

      // Add any new images
      for (let file of newImageFiles) {
        console.log('Appending file:', file);
        formData.append('newImages', file);
      }
      console.log('End of New image files to upload:');
      const response = await fetch(`/dress/${dress.id}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || response.statusText}`);
        return;
      }

      const result = await response.json();
      dress = result.dress;
      editing = false;
      newImageFiles = []; // Clear after successful save
      alert('Dress saved successfully!');
    } catch (err) {
      alert('Error saving dress');
      console.error(err);
    }
  }


  // Function to delete the dress (DELETE request)
  async function deleteDress() {
    if (!confirm('Are you sure you want to delete this dress?')) {
      return;
    }

    try {
      const response = await fetch(`/dress/${dress.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.error || response.statusText}`);
        return;
      }

      alert('Dress deleted successfully!');
    } catch (err) {
      alert('Error deleting dress');
      console.error(err);
    }
  }

  function closeImage() {
		isFullscreen = false;
	}

  function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape') closeImage();
	}

	// Optional: listen for Escape key
	onMount(() => {
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});

</script>

<div class="min-h-[85vh] flex items-center justify-center px-4 py-8">
  <article class="mx-auto p-6 justify-center w-full max-w-7xl">
    <header class="text-center mb-8">
    {#if editing}
      <div class="flex flex-col items-center justify-center">
        <input
          class="text-4xl font-semibold pb-1 border border-gray-300 rounded px-2 text-center w-[70vw]"
          bind:value={dress.name}/>
        <!-- <input INFO: Can be added later if collections are a thing
          class="text-xl dark:text-surface-400 text-surface-800 border border-gray-300 rounded px-2 text-center mt-2"
          bind:value={dress.collection}/> -->
      </div>
    {:else}
      <h1 class="text-4xl font-semibold pb-1">{dress.name}</h1>
      <!-- <p class="text-xl dark:text-surface-400 text-surface-800">{dress.collection}</p> -->
    {/if}
  </header>

    <!-- Main Flex Layout -->
    <div class="flex flex-col lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 gap-8 items-start justify-center">

      <div class="hidden xl:flex flex-col max-h-[100vh] overflow-y-scroll no-scrollbar">
      <!-- Thumbnails -->
      <div class="flex flex-col gap-4 w-24 items-center no-scrollbar justify-start mx-auto mt-[2vh] min-h-[90vh]">
        {#each dress.images as img, i}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="w-full aspect-[9/16] relative rounded-md overflow-hidden cursor-pointer transition-transform duration-200 transform origin-center
              {i === currentIndex ? 'scale-110 z-10' : 'scale-100'}" onclick={() => selectImage(i)}>
            <img
              src={img}
              alt="Thumbnail"
              class="absolute inset-0 w-full h-full object-cover"/>
          </div>
        {/each}
      </div>
    </div>


    <!-- Main Image -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="relative mx-auto flex flex-col items-center gap-4 w-full max-w-md">
      <div class="relative aspect-[9/16] w-full rounded-lg shadow-lg dark:shadow-surface-900 shadow-surface-400 overflow-hidden">
        <!-- Clickable Main Image -->
        {#key currentIndex}
          <img
            src={dress.images[currentIndex]}
            alt="{dress.name}"
            class="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onclick={() => isFullscreen = true}/>
        {/key}

        <!-- Arrows -->
        <button
          class="btn absolute top-1/2 left-0 transform -translate-y-1/2 p-2 z-20 text-2xl bg-surface-400 hover:bg-white mx-2 transition rounded-full"
          onclick={prevImage}>
          ‹
        </button>
        <button
          class="btn absolute top-1/2 right-0 transform -translate-y-1/2 p-2 z-20 text-2xl bg-surface-400 hover:bg-white mx-2 transition rounded-full"
          onclick={nextImage}>
          ›
        </button>
      </div>

      <!-- Fullscreen Overlay -->
      {#if isFullscreen}
        <div
          class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onclick={() => isFullscreen = false}>
          <!-- Image -->
          <img
            src={dress.images[currentIndex]}
            alt="Fullscreen"
            class="max-h-[90vh] max-w-[90vw] object-contain rounded z-60"
            onclick={(e) => e.stopPropagation()}
          />

          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 text-white text-3xl z-70"
            onclick={(e) => { e.stopPropagation(); isFullscreen = false; }}
            aria-label="Close fullscreen">
            &times;
          </button>

          <!-- Navigation Arrows -->
            <button
            class="absolute left-4 top-1/2 transform -translate-y-1/2 z-70 p-4 text-white text-4xl"
            onclick={(e) => { e.stopPropagation(); prevImage(); }}>
            ‹
          </button>
          <button class="absolute right-4 top-1/2 transform -translate-y-1/2 z-70 p-4 text-white text-4xl" 
            onclick={(e) => { e.stopPropagation(); nextImage(); }}>
            ›
          </button>
        </div>
      {/if}

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-2">
        {#each dress.images as _, i}
          <div
            class="w-3 h-3 rounded-full cursor-pointer transition-colors duration-200"
            class:bg-surface-800={i === currentIndex}
            class:dark:bg-surface-50={i === currentIndex}
            class:bg-gray-400={i !== currentIndex}
            class:dark:bg-gray-600={i !== currentIndex}
            onclick={() => selectImage(i)}
          ></div>
        {/each}
      </div>
    </div>


      <!-- Dress Details -->
      <div class="space-y-6 self-start justify-baseline w-full">
        <section>
          <h2 class="text-2xl mb-4"><strong>Description:</strong></h2>
            {#if editing}
              <textarea class="ml-2 border border-gray-300 rounded px-2 w-[25vw] h-[25vh]" bind:value={dress.description}></textarea>
            {:else}
              <p class="text-left">{dress.description}</p>  
            {/if}

          {#if data.isAdmin}
            <div class="my-4 flex flex-col gap-4">
              <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onclick={() => editing = !editing}>Edit</button>
              <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onclick={deleteCurrentImage}>Delete Selected Picture</button>
              <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onclick={deleteDress}>Delete Dress</button>
              <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700" onclick={() => dress.isHidden = !dress.isHidden}> {dress.isHidden ? 'Show' : 'Hide'} </button>
              <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onclick={saveDress}>Save</button>
            </div>
            <FileUpload 
              name="Upload_Pictures_Dress"
              accept="image/*"
              maxFiles={99}
              subtext="Upload pictures for dress."
              onFileChange={(e) => handleFileChange(e.acceptedFiles)}
              onFileReject={console.error}
              classes="w-full border border-dashed border-gray-500"
            >
              {#snippet iconInterface()}<IconDropzone class="size-8" />{/snippet}
            </FileUpload>
            <strong>Hidden:</strong> {dress.isHidden}
          {/if}
        </section>
      </div>
    </div>
  </article>
</div>