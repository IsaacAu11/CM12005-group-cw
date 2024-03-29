<script lang="ts">
	export let modalOpen: boolean;
	export let title: string = '';
	export let description: string = '';
	export let fieldPlaceholderText: string = '';
	export let onClose: () => void;
	export let onSubmit: (fieldText: string) => void;
	export let validationFunction: (fieldText: string) => boolean;

	import close from '$lib/assets/close.svg';

	let fieldText: string = '';
	let loadingSubmit = false;

	$: fieldPlaceholder = fieldPlaceholderText !== '' ? fieldPlaceholderText : 'Enter Text';

	async function validateAndSubmit() {
		if (validationFunction(fieldText)) {
            loadingSubmit = true;
			onSubmit(fieldText);
			fieldText = '';
            loadingSubmit = false;
		}
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
			<input
				type="text"
				placeholder={fieldPlaceholder}
				class="input input-bordered w-full"
				bind:value={fieldText}
			/>

			{#if loadingSubmit}
				<span class="loading loading-dots loading-lg text-primary"></span>
			{/if}
			<button class="btn" on:click={() => validateAndSubmit()}>Submit</button>
		</form>
	</div>
</dialog>
