<script lang="ts">
	let inStudyMode: boolean = true;

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-base-100';
</script>

<div class="h-screen flex flex-col items-center justify-end drop-shadow-2xl">
	<div class="p-5 w-1/2 h-5/6 rounded-lg {bgColor}">
		<div class="mb-2 flex justify-around">
			<button class="btn">Dropdown</button>
			{#if inStudyMode}
				<button on:click={toggleStudyMode} class="btn">Study Mode</button>
			{:else}
				<button on:click={toggleStudyMode} class="btn">Break Mode</button>
			{/if}
		</div>
		<h1 class="bg-primary">Welcome to SvelteKit</h1>

		<h2>Get started by editing this file</h2>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
</div>
