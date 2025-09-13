<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="w-full h-[90vh] flex items-center justify-center bg-surface-50 dark:bg-surface-800 text-foreground px-4">
  <div class="text-center space-y-14">
    <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Oops, something went wrong!</h1>
        <p class="text-lg dark:text-red-400 text-red-600">{(page.error?.message ?? 'An unexpected error occurred') + "."}</p>
    </div>
    <a href="/">
      <button type="button" class="btn border dark:border-surface-50 border-surface-900 btn-lg">Back to Home</button>
    </a>
  </div>
</div>
