<div class="flex flex-col justify-between w-full mx-auto h-full">
  <form class="space-y-4" action="https://formsubmit.co/giothysham@gmail.com" method="POST">
    <label class="label">
      <span class="label-text">First Name</span>
      <input
        type="text"
        name="First Name"
        class="input border dark:border-surface-50 rounded px-3 py-2"
        placeholder="Ex: John"
      />
    </label>
    <label class="label">
      <span class="label-text">Last Name</span>
      <input
        type="text"
        name="Last Name"
        class="input border dark:border-surface-50 rounded px-3 py-2"
        placeholder="Ex: Smith"
      />
    </label>
    <label class="label">
      <span class="label-text">Phone Number</span>
      <input
        type="tel"
        name="Phone Number"
        class="input border dark:border-surface-50 rounded px-3 py-2"
        placeholder="Ex: +961 1 111 111"
      />
    </label>
    <label class="label">
      <span class="label-text">E-mail Address</span>
      <input
        type="email"
        name="Email"
        class="input border dark:border-surface-50 rounded px-3 py-2"
        placeholder="Ex: john.smith@example.com"
      />
    </label>
    <label class="label">
      <span class="label-text">Description</span>
      <textarea
        name="Description"
        class="textarea border dark:border-surface-50 rounded px-3 py-2 h-[27vh]"
        placeholder="Write your description of the clothing piece here..."
      ></textarea>
    </label>
    <input type="hidden" name="_next" value="http://localhost:5173/" /> <!-- TODO: Change this to your actual URL/Make thank you page -->
    <div class="flex justify-center">
      <button class="btn py-2 hover:preset-tonal w-full" type="submit">Submit</button>
    </div>
  </form>
</div>
