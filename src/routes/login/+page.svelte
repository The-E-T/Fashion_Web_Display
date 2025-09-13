<script lang="ts">
  let email = '';

  async function sendLink() {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    alert(await res.text());
  }
</script>

<div class="w-full h-[90vh] flex items-center justify-center bg-surface-50 dark:bg-surface-800 text-foreground px-4">
  <div class="text-center items-center justify-center space-y-14">
    <div class="text-center items-center justify-center space-y-4">
      <h1 class="text-4xl font-bold">Login with Magic Link</h1>
      <input type="email" class="p-2 w-sm border dark:border-surface-50 border-surface-900" bind:value={email} placeholder="Your email" />
    </div>
    <button type="button" class="btn border dark:border-surface-50 border-surface-900 btn-lg" on:click={sendLink}>Send Magic Link</button>
  </div>
</div>
