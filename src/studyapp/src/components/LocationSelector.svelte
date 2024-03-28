<script lang="ts">
	export let showCreateButton: boolean;
	export let savedLocations: LocationData[];
	export let onOpen: () => void;
	export let onSelected: (selectedLocation: LocationData) => void;
	let selectedLocation: LocationData | null;

	import create from '$lib/assets/create.svg';
	import type { LocationData } from '../types';

	$: selectText = selectedLocation === null ? `${selectedLocation}` : 'Your Saved Study Locations';
</script>

<div class="grid grid-cols-2 gap-2">
	<select
		class="select select-accent w-full max-w-xs bg-accent"
		bind:value={selectedLocation}
		on:change={() => {
			if (selectedLocation !== null) {
				onSelected(selectedLocation);
			}
		}}
	>
		<option disabled selected>{selectText}</option>
		{#each savedLocations as location}
			<option value={location}>{location.name}</option>
		{/each}
	</select>
	{#if showCreateButton}
		<button class="btn btn-accent aspect-square border-transparent" on:click={onOpen}>
			<img class="h-8" src={create} alt="create icon" />
		</button>
	{/if}
</div>
