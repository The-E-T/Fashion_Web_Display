module.exports = {
   content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@skeletonlabs/skeleton/**/*.{js,css}'
  ],
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@skeletonlabs/skeleton-svelte/tailwind'),
    require('@skeletonlabs/skeleton'),
  ],
}
