<script lang="ts">
	import { onMount } from 'svelte';
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	let dataLoaded = false;

	let days: number[] = [];
	let studyHours: number[] = [];

	$: data = {
		labels: days,
		datasets: [
			{
				label: 'Study Hours',
				data: studyHours,
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.25
			}
		]
	};

	onMount(async () => {
		await getData();
	});

	async function getData() {
		// TODO: Backend Calculation
		await new Promise((r) => setTimeout(r, 50));
		days = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30
		];
		// Generate 30 random numbers
		studyHours = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
		dataLoaded = true;
	}
</script>

{#if dataLoaded}
	{#key studyHours}
		<Line {data} options={{ responsive: true }} />
	{/key}
{:else}
	<span class="loading loading-dots loading-lg text-primary"></span>
{/if}
