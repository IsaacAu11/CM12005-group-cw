<script lang="ts">
	import { onMount } from 'svelte';
	import type { StudyLocationStats } from '../types';

	onMount(async () => {
		await getData();
	});

	let locations: StudyLocationStats[] = [];

	$: console.log(locations);

	async function getData() {
		// TODO: Backend Calculation
		await new Promise((r) => setTimeout(r, 50));

		let exampleLocationsNames = [
			'Library',
			'Home',
			'Cafe',
			'Park',
			'Coffee Shop',
			'Dorm',
			'Classroom',
			'Study Room',
			'Computer Lab',
			'Gym',
			'Office',
			'Kitchen',
			'Living Room',
			'Bedroom',
			'Balcony'
		];
		for (let i = 0; i < 15; i++) {
			let location: StudyLocationStats = {
				name: exampleLocationsNames[i % exampleLocationsNames.length],
				averageMood: Math.random() * 5,
				averageProductivity: Math.random() * 10
			};
			locations = [...locations, location];
		}
	}
</script>

<div class="w-full h-4/5 overflow-auto">
	{#each locations as location}
		<div class="bg-neutral-100 my-3 rounded-md p-2">
			<h4 class="font-bold text-lg">Location: {location.name}</h4>
			<p>Average Mood: {location.averageMood.toFixed(2)}</p>
			<p>Average Productivity: {location.averageProductivity.toFixed(2)}</p>
		</div>
	{/each}
</div>
