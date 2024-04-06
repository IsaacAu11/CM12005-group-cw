<script lang="ts">
	import { onMount } from 'svelte';
	import type { Day } from '../types';
	import HeatMapDay from './HeatMapDay.svelte';

	let data: number[] = [];

	let startingIndexForRemaining = 7 - getFirstDayOfTheMonth();

	let daysOfTheWeek: Day[] = [
		{ fullName: 'Monday', shortName: 'Mon' },
		{ fullName: 'Tuesday', shortName: 'Tue' },
		{ fullName: 'Wednesday', shortName: 'Wed' },
		{ fullName: 'Thursday', shortName: 'Thu' },
		{ fullName: 'Friday', shortName: 'Fri' },
		{ fullName: 'Saturday', shortName: 'Sat' },
		{ fullName: 'Sunday', shortName: 'Sun' }
	];

	onMount(async () => {
		await getData();
	});

	function mod(n: number, m: number) {
		return ((n % m) + m) % m;
	}

	function getFirstDayOfTheMonth() {
		let date: Date = new Date();
		let firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);

		// NOTE: The getDay() function maps 0 to Sunday.
		// Because our start day for the week starts on Monday we need to
		// convert from Sunday - Saturday (0 - 6) to Monday - Sunday (0 - 6)
		// 0 -> 6, 1 -> 0, 2 -> 1, 3 -> 2, 4 -> 3, 5 -> 4, 6 -> 5

		let day: number = mod(firstDay.getDay() - 1, 7);
		return day;
	}

	function getNumberOfDaysInMonth() {
		let date: Date = new Date();
		// NOTE: 0 for day means the last day of the previous month
		// Therefore by adding one to the current month, we return the date of
		// the last day of the current month.

		// SRC: https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}

	async function getData() {
		// TODO: Backend Calculation
		await new Promise((r) => setTimeout(r, 50));
		// I set it to 15 to test when value = null
		data = Array.from({ length: 15 }, () => Math.random() * 5);
	}
</script>

<div class="w-full">
	<div class="flex flex-row justify-around gap-1">
		{#each daysOfTheWeek as day}
			<p class="w-10 text-center">{day.shortName.toUpperCase()}</p>
		{/each}
	</div>

	<!-- First Row -->
	<div class="grid grid-cols-7 justify-items-center gap-1 pb-1">
		{#each Array(7) as _, i}
			{#if i >= getFirstDayOfTheMonth()}
				<HeatMapDay value={data[i - getFirstDayOfTheMonth()]} />
			{:else}
				<HeatMapDay visible={false} />
			{/if}
		{/each}
	</div>
	<div class="grid grid-cols-7 justify-items-center gap-1 mb-5">
		{#each Array(getNumberOfDaysInMonth() - startingIndexForRemaining) as _, i}
			<HeatMapDay value={data[i + startingIndexForRemaining]} />
		{/each}
	</div>
</div>
