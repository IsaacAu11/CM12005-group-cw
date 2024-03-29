<script lang="ts">
	export let onSubmit: (productivity: number, mood: number) => void;

	import { fade } from 'svelte/transition';

	let loadingSubmit = false;

	let productivty: number = 0;
	let mood: number = 0;

	function inRange(value: number, min: number, max: number) {
		return value >= min && value <= max;
	}

	async function validateAndSubmit() {
		if (inRange(productivty, 0, 10) && inRange(mood, 0, 5)) {
            loadingSubmit = true;
			onSubmit(productivty, mood);
            loadingSubmit = false;
		}
	}
</script>

<form
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ delay: 50, duration: 150 }}
	class="flex flex-col gap-y-20 pt-5 px-5 items-center"
>
	<div class="flex flex-col gap-y-10">
		<h1 class="font-bold text-4xl">STUDY TIME OVER!</h1>
		<p>
			Congratulations! Study time is over and we hope it was a good study session. Please reflect on
			your study period with these questions. Let's celebrate your progress and pave the way for
			even greater achievements ahead!
		</p>
		<div>
			<label for="productivity" class="label font-medium text-2xl">
				Productivity: ({productivty}/10)
			</label>
			<input
				id="productivity"
				type="range"
				min="0"
				max="10"
				class="range range-accent"
				step="1"
				bind:value={productivty}
			/>
			<div class="w-full flex justify-between text-xs px-2">
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
			</div>
		</div>

		<div>
			<label for="mood" class="label font-medium text-2xl">Mood: ({mood}/5)</label>
			<input
				id="mood"
				type="range"
				min="0"
				max="5"
				class="range range-accent"
				step="1"
				bind:value={mood}
			/>
			<div class="w-full flex justify-between text-xs px-2">
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
			</div>
		</div>
	</div>

	{#if loadingSubmit}
		<span class="loading loading-dots loading-lg text-primary"></span>
	{/if}
	<button class="btn w-1/2" on:click={() => validateAndSubmit()}>Submit</button>
</form>
