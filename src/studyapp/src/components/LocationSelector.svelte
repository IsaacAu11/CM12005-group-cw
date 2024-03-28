<script lang="ts">
    export let showCreateButton: boolean;
	export let savedLocations: string[];
	export let selectedLocation: string;
	export let onOpen: () => void;

	import create from '$lib/assets/create.svg';

	$: selectText = selectedLocation ? `${selectedLocation}` : 'Your Saved Study Locations';
</script>

<div
	class="grid grid-cols-2 gap-2"
>
	<select class="select select-accent w-full max-w-xs bg-accent">
		<option disabled selected>{selectText}</option>
		{#each savedLocations as location}
			<option value={location} on:click={() => (selectedLocation = location)}>{location}</option>
		{/each}
	</select>
    {#if showCreateButton}
	<button class="btn btn-accent aspect-square border-transparent" on:click={onOpen}>
		<img class="h-8" src={create} alt="create icon" />
	</button>
    {/if}
</div>
