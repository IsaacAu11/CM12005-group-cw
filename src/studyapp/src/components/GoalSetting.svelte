<script lang="ts">
	export let score: number;
	export let onOpen: () => void;

	import { fade } from 'svelte/transition';
</script>

<div
	class="bg-accent w-4/5 py-5 rounded-xl flex flex-col items-center gap-4"
	in:fade={{ delay: 500, duration: 150 }}
	out:fade={{ delay: 50, duration: 250 }}
>
	<p class="text-center">Current Productivity Score Goal: {score}/10</p>
	<button class="btn btn-neutral" on:click={onOpen}>Change Productivity Score Goal</button>
</div>
