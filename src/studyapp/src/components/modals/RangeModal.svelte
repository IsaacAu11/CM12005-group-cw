<script lang="ts">
	export let modalOpen: boolean;
	export let title: string = '';
	export let label: string = '';
	export let description: string = '';
	export let min: number = 0;
	export let max: number = 10;
	export let onClose: () => void;
	export let onSubmit: (score: number) => void;

	import close from '$lib/assets/close.svg';

	let productivityScore: number = 0;
	let loadingSubmit = false;

	async function submit() {
		loadingSubmit = true;
		onSubmit(productivityScore);
		loadingSubmit = false;
		productivityScore = 0;
	}
</script>

<dialog class="modal" class:modal-open={modalOpen}>
	<div class="modal-box relative max-w-none w-1/3">
		<div class="flex flex-row justify-between items-center">
			{#if title !== ''}
				<h1 class="font-bold text-2xl">{title}</h1>
			{/if}
			<div class="modal-action m-0">
				<button on:click={onClose}>
					<!-- NOTE: Handle Modal -->
					<img class="h-8" src={close} alt="close icon" />
				</button>
			</div>
		</div>
		{#if description !== ''}
			<p class="py-4">{description}</p>
		{/if}
		<form class="grid grid-cols gap-4">
			<div>
				<label for="productivity" class="label font-medium text-2xl">
					{label}: ({productivityScore}/{max})
				</label>
				<input
					id="productivity"
					type="range"
					{min}
					{max}
					class="range range-accent"
					step="1"
					bind:value={productivityScore}
				/>
				<div class="w-full flex justify-between text-xs px-2">
					{#each Array(max - min + 1) as _}
						<span>|</span>
					{/each}
				</div>
			</div>

			{#if loadingSubmit}
				<span class="loading loading-dots loading-lg text-primary"></span>
			{/if}
			<button class="btn" on:click={() => submit()}>Submit</button>
		</form>
	</div>
</dialog>
