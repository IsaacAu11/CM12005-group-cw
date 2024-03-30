<script lang="ts">
	export let productivityGoalModalOpen: boolean;
	export let onClose: () => void;
	export let onSubmit: (score: number) => void;

	import RangeModal from './RangeModal.svelte';

	async function updateDatabase(score: number) {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 500));
		onSubmit(score);
	}
</script>

<RangeModal
	modalOpen={productivityGoalModalOpen}
	title="Change Productivity Goal"
	label="Productivity"
	min={0}
	max={10}
	{onClose}
	onSubmit={updateDatabase}
/>
