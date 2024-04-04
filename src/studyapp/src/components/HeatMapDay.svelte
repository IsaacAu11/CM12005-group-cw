<script lang="ts">
	export let visible: boolean;
	export let value: number | null = null;
	export let disabled: boolean = false;

	function displayValue(value: number): string {
		return value.toPrecision(3);
	}

	function getColor(disabled: boolean, value: number | null): string {
		if (disabled) {
			return 'bg-gray-200';
		} else if (value === null) {
			return 'bg-gray-100';
		} else if (value < 0.5) {
			return 'bg-red-100';
		} else if (value < 0.75) {
			return 'bg-yellow-100';
		} else {
			return 'bg-green-100';
		}
	}
</script>

<div class="w-10">
	{#if visible == true}
		<div class="aspect-square p-1 {getColor(disabled, value)} rounded">
			{#if value !== null}
				<p>{displayValue(value)}</p>
			{/if}
		</div>
	{/if}
</div>
