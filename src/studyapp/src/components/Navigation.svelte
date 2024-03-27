<script lang="ts">
	import burger from '$lib/assets/menu.svg';
	import home from '$lib/assets/home.svg';
	import stats from '$lib/assets/stats.svg';
	import insights from '$lib/assets/insights.svg';
</script>

<div class="absolute left-0 z-50">
	<details class="dropdown m-8">
		<summary class="btn aspect-square">
			<img src={burger} alt="menuburger" />
		</summary>
		<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
			<li class="m-2">
				<a href={'#'}>
					<img class="h-8" src={home} alt="home icon" />
					Home</a
				>
			</li>
			<li class="m-2">
				<a href={'#'}>
					<img class="h-8" src={stats} alt="stats icon" />
					Stats</a
				>
			</li>
			<li class="m-2">
				<a href={'#'}>
					<img class="h-8" src={insights} alt="insights icon" />
					Insights</a
				>
			</li>
		</ul>
	</details>
</div>
