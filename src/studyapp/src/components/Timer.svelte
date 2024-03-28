<script lang="ts">
	export let inStudyMode: boolean;
	export let timerStarted = false;
	export let timerComplete = false;

	import { fade } from 'svelte/transition';
	import play from '$lib/assets/play.svg';
	import pause from '$lib/assets/pause.svg';
	import { onMount } from 'svelte';

	let durationMinutes = 15; // NOTE: Based on user settings
	// let durationMinutes = 0.02; // TESTING

	if (!inStudyMode) {
		durationMinutes = 5; // NOTE: Based on user settings
	}
	let durationMs = durationMinutes * 60 * 1000;
	let remainingTimeMs = durationMs;
	let formattedTime = formatTime(remainingTimeMs);
	let isPaused = true;

	function resetTimer() {
		remainingTimeMs = durationMs;
		isPaused = true;
		timerComplete = false;
		timerStarted = false;
	}

	onMount(() => {
        resetTimer();
		let lastTime = Date.now();
		setInterval(() => {
			let currentTime = Date.now();
			if (!isPaused) {
				remainingTimeMs = Math.max(0, remainingTimeMs - (currentTime - lastTime));
				lastTime = currentTime;
			} else {
				lastTime = Date.now();
			}
			formattedTime = formatTime(remainingTimeMs);

			if (remainingTimeMs < durationMs && !timerStarted) {
				timerStarted = true;
			}

			if (remainingTimeMs === 0) {
				timerComplete = true;
			}
		});
	});

	function formatTime(ms: number) {
		const hours = Math.floor(ms / 3600000);
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		if (hours > 0) {
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		} else {
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		}
	}
</script>

<div
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ delay: 50, duration: 150 }}
	class="sm:h-1/2 md:h-5/6 flex flex-col items-center justify-center gap-4"
>
	<h1 class="font-bold text-6xl">{formattedTime}</h1>
	{#if timerStarted}
		<h3 class="font-bold text-2xl">REMAINING</h3>
		{#if inStudyMode}
			<div class="badge badge-accent badge-lg">
				<p class="font-bold text-lg">STUDY</p>
			</div>
		{:else}
			<div class="badge badge-secondary badge-lg">
				<p class="font-bold text-lg">BREAK</p>
			</div>
		{/if}
	{/if}
	<label class="swap m-2">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" bind:checked={isPaused} />

		<div class="swap-on">
			<img class="fill-current w-10 h-10" src={play} alt="play" />
		</div>
		<div class="swap-off">
			<img class="fill-current w-10 h-10" src={pause} alt="pause" />
		</div>
	</label>
</div>
<div class="flex flex-col items-center justify-end gap-4">
	<progress class="progress progress-accent w-5/6 h-10" value={remainingTimeMs} max={durationMs}
	></progress>

	{#if timerStarted}
		<button
			in:fade={{ delay: 500, duration: 250 }}
			out:fade={{ delay: 50, duration: 250 }}
			class="btn btn-primary w-2/5"
			on:click={() => {
				resetTimer();
			}}
		>
			Reset
		</button>
	{/if}
</div>
