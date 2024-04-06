<script lang="ts">
	export let visible: boolean = true;
	export let value: number | null = null;
	// value will be from 0-5

	function displayValue(value: number): string {
		return value.toFixed(2);
	}

	function getColor(value: number | null): string {
		if (value === null) {
			return 'bg-gray-200';
		} else if (value < 3) {
			return 'bg-red-200';
		} else if (value < 4) {
			return 'bg-yellow-200';
		} else {
			return 'bg-green-200';
		}
	}
</script>

<div class="w-10">
	{#if visible == true}
		<div class="w-full aspect-square {getColor(value)} rounded flex justify-center items-center">
			{#if value !== null}
				<p>{displayValue(value)}</p>
			{/if}
		</div>
	{/if}
</div>
