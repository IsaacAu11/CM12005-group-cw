<script lang="ts">
	export let inStudyMode;

	import play from '$lib/assets/play.svg';
	import pause from '$lib/assets/pause.svg';
	import { onMount } from 'svelte';

	let durationMinutes = 15;

	if (!inStudyMode) {
		durationMinutes = 5;
	}
	let durationMs = durationMinutes * 60 * 1000;
	let remainingTimeMs = durationMs;
	let formattedTime = formatTime(remainingTimeMs);
	let isPaused = true;
	let timerComplete = false;

	onMount(() => {
		let lastTime = Date.now();
		setInterval(() => {
            let currentTime = Date.now();
            if (!isPaused) {
                remainingTimeMs = Math.max(0, remainingTimeMs - (currentTime - lastTime));
                formattedTime = formatTime(remainingTimeMs);
                lastTime = currentTime;
            } else {
                lastTime = Date.now();
            }

			if (remainingTimeMs  === 0) {
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

	function checkForSpaceBar(event: KeyboardEvent) {
		if (event.key === ' ') {
			isPaused = !isPaused;
		}
	}
</script>

<div class="sm:h-1/2 md:h-5/6 flex flex-col items-center justify-center">
	<h1 class="font-bold text-6xl">{formattedTime}</h1>
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
<div class="flex flex-col items-center justify-end">
	<progress class="progress progress-accent w-5/6 h-10" value={remainingTimeMs} max={durationMs}
	></progress>
</div>

<svelte:window on:keyup|preventDefault={checkForSpaceBar} />
