<script lang="ts">
	import { fade } from 'svelte/transition';
	import Timer from '../components/Timer.svelte';
	import { onMount } from 'svelte';
	import Reflection from '../components/Reflection.svelte';
	import TodoList from '../components/TodoList.svelte';
	import NewLocationModal from '../components/NewLocationModal.svelte';
	import LocationDropdown from '../components/LocationDropdown.svelte';

	let inStudyMode: boolean = true;

	let timerStarted: boolean = false;
	let timerComplete: boolean = false;

	let reflectionComplete: boolean = false;

	let locationModalOpen = false;
	let savedLocations: string[] = [];
	let selectedLocation: string = '';

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-warning';

	onMount(async () => {
		savedLocations = await getSavedLocations();
	});

	async function getSavedLocations() {
		await new Promise((r) => setTimeout(r, 500));
		return ['Library', 'Home', 'Cafe'];
	}
</script>

<layer>
	<TodoList />
</layer>
<layer>
	<div class="h-screen flex flex-col items-center justify-end drop-shadow-2xl">
		<div class="pt-5 pl-5 pr-5 w-1/2 h-5/6 rounded-lg {bgColor}">
			{#if !timerStarted}
				<!-- NOTE: Location Dropdown, Location Button and Study/Break Toggle -->
				<div class="mb-2 flex justify-around md:flex-auto">
					<div
						in:fade={{ delay: 500, duration: 150 }}
						out:fade={{ delay: 50, duration: 250 }}
						class="grid grid-cols-2 gap-2"
					>
						<LocationDropdown
							{savedLocations}
							{selectedLocation}
							onOpen={() => (locationModalOpen = true)}
						/>
					</div>
					{#if inStudyMode}
						<button on:click={toggleStudyMode} class="btn btn-accent">Study Mode</button>
					{:else}
						<button on:click={toggleStudyMode} class="btn btn-secondary">Break Mode</button>
					{/if}
				</div>
			{/if}
			{#if !timerComplete || (timerComplete && reflectionComplete)}
				{#key inStudyMode}
					<Timer {inStudyMode} bind:timerStarted bind:timerComplete />
				{/key}
			{:else}
				<Reflection bind:reflectionComplete />
			{/if}
		</div>
	</div>
</layer>

<NewLocationModal
	{locationModalOpen}
	onClose={() => (locationModalOpen = false)}
	onSubmit={(newLocation) => {
		savedLocations = [...savedLocations, newLocation];
		locationModalOpen = false;
	}}
/>
