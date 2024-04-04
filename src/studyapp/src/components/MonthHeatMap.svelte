<script lang="ts">
	import type { Day } from '../types';
	import HeatMapDay from './HeatMapDay.svelte';

	let daysOfTheWeek: Day[] = [
		{ fullName: 'Monday', shortName: 'Mon' },
		{ fullName: 'Tuesday', shortName: 'Tue' },
		{ fullName: 'Wednesday', shortName: 'Wed' },
		{ fullName: 'Thursday', shortName: 'Thu' },
		{ fullName: 'Friday', shortName: 'Fri' },
		{ fullName: 'Saturday', shortName: 'Sat' },
		{ fullName: 'Sunday', shortName: 'Sun' }
	];

	function getFirstDayOfTheMonth() {
		let date: Date = new Date();
		let firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);
		return firstDay.getDay();
	}
</script>

<p>Month Heat Map</p>
<div class="w-full">
	<div class="flex flex-row justify-around gap-1">
		{#each daysOfTheWeek as day}
			<p class="w-10 text-center">{day.shortName.toUpperCase()}</p>
		{/each}
	</div>
	<div class="flex flex-row justify-around gap-1">
		<HeatMapDay visible={false}/>
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
		<HeatMapDay visible={true} value={1.25823} disabled={false} />
	</div>
</div>
