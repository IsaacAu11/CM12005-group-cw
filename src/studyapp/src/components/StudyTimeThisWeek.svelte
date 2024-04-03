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

	let studyHours: number[] = [];

	$: data = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
		studyHours = [5, 10, 5, 32, 55, 30, 35];
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
