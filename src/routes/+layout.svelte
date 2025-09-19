	<script lang="ts">
	import '../app.css';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
	
	let { children } = $props();
	</script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


<div class="bg-surface-50 dark:bg-surface-800 min-h-screen flex flex-col">
	<div class="grid grid-cols-[1fr_2fr_1fr] items-center md:justify-between w-full">
		<div class="flex align-middle"></div> <!-- replacement for menu button below -->
		<!-- <button onclick={toggleMenu} class="flex align-middle"><span class="material-symbols-outlined px-3">menu</span>Menu</button>  
		   {#if isMenuOpen}
			<div
			role="button"
			tabindex="0"
			onclick={closeMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMenu()}
			class="fixed inset-0 bg-black/60 z-40"
			aria-label="Close menu"
			></div>
		{/if} -->

		<a href="/" class="flex lg:text-4xl md:text-4xl text-2xl py-4 justify-center w-full">Lara Nassif</a>
		<nav class="fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-surface-100 dark:bg-surface-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out {isMenuOpen ? 'translate-x-0' : '-translate-x-full'}" aria-labelledby="menu-heading">
		<div class="flex flex-col h-full">
			<!-- Menu Header -->
			<div class="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
				<h2 id="menu-heading" class="text-xl font-semibold">Navigation</h2>
				<button onclick={closeMenu} class="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors" aria-label="Close menu">
					<span class="material-symbols-outlined">close</span>
				</button>
			</div>

			<!-- Navigation Links -->
			<!-- <div class="flex-grow p-4 space-y-2">
				<a href="/about" onclick={closeMenu} class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-500/10 hover:text-primary-500 transition-colors">
					<span class="material-symbols-outlined">person</span>
					About Me
				</a>
				<a href="/portfolio" onclick={closeMenu} class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-500/10 hover:text-primary-500 transition-colors">
					<span class="material-symbols-outlined">palette</span>
					Portfolio
				</a>
				<a href="/blog" onclick={closeMenu} class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-500/10 hover:text-primary-500 transition-colors">
					<span class="material-symbols-outlined">article</span>
					Blog
				</a>
				<a href="/contact" onclick={closeMenu} class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-500/10 hover:text-primary-500 transition-colors">
					<span class="material-symbols-outlined">email</span>
					Contact
				</a>
			</div>


			<div class="p-4 border-t border-surface-200 dark:border-surface-700">
				<p class="text-xs text-surface-500 dark:text-surface-400 text-center">&copy; {new Date().getFullYear()} Lara Nassif</p>
			</div> -->
		</div>
		</nav>
		<div class="flex align-middle justify-end">
			<button type="button" class="btn flex align-middle justify-end items-end py-3"><a href="/gallery" class="hidden sm:inline justify-center">Explore</a><span class="material-symbols-outlined px-3"><a href="/gallery">search</a></span></button>
		</div>
	</div>
	<hr class="hr w-full border-t-2 border-surface-800 dark:border-surface-50 overflow-hidden" />
	<div class="px-[5vw] flex-grow">
		{@render children()}
	</div>
	<!-- TODO: Make footer of website -->
	 <!-- TODO: Add social media to footer -->
	<footer class="bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200 text-sm py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
		<div class="text-center sm:text-left">
			&copy; {new Date().getFullYear()} Lara Nassif. All rights reserved.
		</div>
		<div class="flex gap-4 text-sm">
			<a href="/about" class="hover:underline">About</a>
			<a href="/contact" class="hover:underline">Contact</a>
			<a href="/privacy" class="hover:underline">Privacy</a>
		</div>
		</div>
	</footer>
</div>
