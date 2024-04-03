<script lang="ts">
	import { onMount } from 'svelte';

	type InsightsHandler = {
		studyHoursAndProductivity: number;
		moodAndProductivity: number;
		optimalStudyingHours: number;
		bestLocation: string;
		minimumMoodScore: number;
	};

	let insights: InsightsHandler | null = null;

	function betweenRange(value: number, min: number, max: number) {
		return value >= min && value < max;
	}

	function correlationStringWithNumber(correlationCoefficient: number) {
		function correlationString(correlationCoefficient: number) {
			// src: https://qph.cf2.quoracdn.net/main-qimg-93f9dc9d368e5e0021887d25dc25bb54-pjlq
			switch (true) {
				case correlationCoefficient <= -1:
					return 'Perfect Negative Correlation';
				case betweenRange(correlationCoefficient, -1, -0.8):
					return 'Strong Negative Correlation';
				case betweenRange(correlationCoefficient, -0.8, -0.6):
					return 'Moderate Negative Correlation';
				case betweenRange(correlationCoefficient, -0.6, -0.4):
					return 'Weak Negative Correlation';
				case betweenRange(correlationCoefficient, -0.4, -0.2):
					return 'Very Weak Negative Correlation';
				case betweenRange(correlationCoefficient, -0.2, 0.2):
					return 'No Correlation';
				case betweenRange(correlationCoefficient, 0.2, 0.4):
					return 'Very Weak Positive Correlation';
				case betweenRange(correlationCoefficient, 0.4, 0.6):
					return 'Weak Positive Correlation';
				case betweenRange(correlationCoefficient, 0.6, 0.8):
					return 'Moderate Positive Correlation';
				case betweenRange(correlationCoefficient, 0.8, 1):
					return 'Strong Positive Correlation';
				case correlationCoefficient >= 1:
					return 'Perfect Positive Correlation';
				default:
					return 'No Correlation';
			}
		}
		return correlationString(correlationCoefficient) + ' (' + correlationCoefficient + ')';
	}

	onMount(async () => {
		await getInsights();
	});

	async function getInsights() {
		// TODO: Backend Calculation
		await new Promise((r) => setTimeout(r, 50));
		insights = {
			studyHoursAndProductivity: 0.8,
			moodAndProductivity: 0.5,
			optimalStudyingHours: 4,
			bestLocation: 'Library',
			minimumMoodScore: 3
		};
	}
</script>

<div class="h-screen w-full flex flex-col items-center justify-end">
	<div class="pt-5 px-5 w-3/5 h-5/6 rounded-lg bg-secondary drop-shadow-2xl text-center">
		<h1 class="text-center font-bold text-4xl">INSIGHTS REPORT</h1>
		<p>
			Your personalized guide to understanding your study patterns and progress! This report
			provides insights to your learning journey, empowering you to make informed decisions and
			optimize your study habits.
		</p>
		<div class="overflow-x-auto m-5">
			{#if insights !== null}
				<table class="table">
					<thead>
						<tr>
							<th>Insight</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Correlation Between Daily Studying Hours and Productivity</td>
							<td>{correlationStringWithNumber(insights.studyHoursAndProductivity)}</td>
						</tr>
						<tr>
							<td>Correlation Between Daily Mood and Produnctivity</td>
							<td>{correlationStringWithNumber(insights.moodAndProductivity)}</td>
						</tr>
						<tr>
							<td>Optimal Studying per Day</td>
							<td>{insights.optimalStudyingHours} Hours Per Day</td>
						</tr>
						<tr>
							<td>Best Location for Productivity and Mood</td>
							<td>{insights.bestLocation}</td>
						</tr>
						<tr>
							<td>Minimum Mood Score for Effective Studying</td>
							<td>{insights.minimumMoodScore}</td>
						</tr>
					</tbody>
				</table>
			{:else}
				<span class="loading loading-dots loading-lg text-primary"></span>
			{/if}
		</div>
	</div>
</div>
