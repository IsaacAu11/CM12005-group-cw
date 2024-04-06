<script>
	import StudyLog from '../../components/StudyLog.svelte';
	import StudyTimeThisMonth from '../../components/StudyTimeThisMonth.svelte';
	import StudyTimeThisWeek from '../../components/StudyTimeThisWeek.svelte';
	import MonthHeatMap from '../../components/MonthHeatMap.svelte';
</script>

<div class="h-screen flex items-center justify-between">
	<!-- Main Component and Study Log Component -->
	<div class="w-full h-full flex flex-col items-center justify-end">
		<div class="pt-5 px-5 w-3/4 h-5/6 rounded-lg bg-secondary drop-shadow-2xl">
			<h1 class="text-center font-bold text-4xl pb-6">Statistics</h1>
			<p class="px-12">
				Your personalized guide to understanding your study patterns and progress! This
				comprehensive report provides valuable insights into your learning journey, empowering you
				to make informed decisions and optimize your study habits. We hope with this report, you'll
				gain valuable knowledge to elevate your academic success to new heights!
			</p>
			<div
				style="border-;margin-left: 80px;margin-right: 80px; background-color: white; margin-top: 50px"
			>
				<div class="flex flex-row content-stretch pb-5 gap-5">
					<div class="bg-neutral w-1/2 rounded-lg">
						<h3 class="text-center font-bold text-2xl py-2">Study Time This Week</h3>
						<StudyTimeThisWeek />
					</div>
					<div class="bg-neutral w-1/2 rounded-lg">
						<h3 class="text-center font-bold text-2xl py-2">Study Time This Month</h3>
						<StudyTimeThisMonth />
					</div>
				</div>
				<div class="flex flex-row gap-5 items-stretch">
					<div class="w-2/5 bg-neutral rounded-lg px-3">
						<h3 class="text-center font-bold text-2xl py-2">Mood This Month</h3>
                        <MonthHeatMap />
					</div>
					<div class="w-3/5 bg-neutral rounded-lg" style="height:200px">Your study locations</div>
				</div>
			</div>
		</div>
	</div>
	<StudyLog />
</div>
