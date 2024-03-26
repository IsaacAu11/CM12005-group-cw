<script lang="ts">
	import Timer from '../components/Timer.svelte';
	import create from '$lib/assets/create.svg';
	let inStudyMode: boolean = true;
	let selectedLocation: string = '';

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-warning';

	$: selectText = selectedLocation ? `${selectedLocation}` : 'Your Saved Study Locations';

	async function getSavedLocations() {
		await new Promise((r) => setTimeout(r, 500));
		return ['Library', 'Home', 'Cafe'];
	}
</script>

<div class="h-screen flex flex-col items-center justify-end drop-shadow-2xl">
	<div class="pt-5 pl-5 pr-5 w-1/2 h-5/6 rounded-lg {bgColor}">
		<div class="mb-2 flex justify-around md:flex-auto">
			<div class="grid grid-cols-2 gap-2">
				<select class="select select-accent w-full max-w-xs bg-accent">
					<option disabled selected>{selectText}</option>
					{#await getSavedLocations()}
						<option disabled>Loading Saved Location...</option>
					{:then locations}
						{#each locations as location}
							<option value={location} on:click={() => (selectedLocation = location)}
								>{location}</option
							>
						{/each}
					{:catch error}
						<option disabled>{error}</option>
					{/await}
				</select>
				<button class="btn btn-accent aspect-square border-transparent">
					<img class="h-8" src={create} alt="create icon" />
				</button>
			</div>
			{#if inStudyMode}
				<button on:click={toggleStudyMode} class="btn btn-accent">Study Mode</button>
			{:else}
				<button on:click={toggleStudyMode} class="btn btn-secondary">Break Mode</button>
			{/if}
		</div>
		{#key inStudyMode}
			<Timer inStudyMode={inStudyMode} />
		{/key}
	</div>
</div>
