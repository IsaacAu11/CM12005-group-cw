<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { LocationData } from '../types';
	import Timer from '../components/Timer.svelte';
	import Reflection from '../components/Reflection.svelte';
	import NewLocationModal from '../components/NewLocationModal.svelte';
	import LocationSelector from '../components/LocationSelector.svelte';
	import TodoList from '../components/TodoList.svelte';

	let inStudyMode: boolean = true;

	let timerStarted: boolean = false; // Set by Timer child component

	let showReflection: boolean = false;

	let locationModalOpen = false;
	let savedLocations: LocationData[] = [];
	let selectedLocation: LocationData | null = null;

	let studyDurationMinutes: number;

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-warning';

	onMount(async () => {
		savedLocations = await getSavedLocations();
	});

	async function getSavedLocations() {
		await new Promise((r) => setTimeout(r, 500));
		let data: LocationData[] = [
			{ id: 1, name: 'Library' },
			{ id: 2, name: 'Home' },
			{ id: 3, name: 'Cafe' }
		];

		return data;
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
				<div
					class="mb-2 flex justify-around md:flex-auto"
					in:fade={{ delay: 500, duration: 150 }}
					out:fade={{ delay: 50, duration: 250 }}
				>
					<LocationSelector
						showCreateButton={true}
						{savedLocations}
						onOpen={() => (locationModalOpen = true)}
						onSelected={(location) => {
							selectedLocation = location;
						}}
					/>
					{#if inStudyMode}
						<button on:click={toggleStudyMode} class="btn btn-accent">Study Mode</button>
					{:else}
						<button on:click={toggleStudyMode} class="btn btn-secondary">Break Mode</button>
					{/if}
				</div>
			{/if}
			{#if !showReflection}
				{#key inStudyMode}
					<Timer
						{inStudyMode}
						bind:timerStarted
						onComplete={(durationMinutes) => {
							showReflection = true;
							studyDurationMinutes = durationMinutes;
						}}
					/>
				{/key}
			{:else}
				<Reflection
					onSubmit={(productivity, mood) => {
						showReflection = false;
						// TODO: Insert into database
						console.log(productivity, mood, studyDurationMinutes, selectedLocation);
						studyDurationMinutes = 0;
					}}
				/>
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
