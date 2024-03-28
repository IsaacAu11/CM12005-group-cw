<script lang="ts">
    export let locationModalOpen: boolean;
	export let onClose: () => void;
	export let onSubmit: (newLocation: string) => void;

	import close from '$lib/assets/close.svg';

	let inputValue: string = '';

	function isValidString() {
		if (inputValue) {
			return true;
		}

		return false;
	}

	async function validateAndSubmit() {
		if (isValidString()) {
			await new Promise((r) => setTimeout(r, 500)); // TODO: Insert new location into database
			onSubmit(inputValue);
		}
	}
</script>

<dialog class="modal" class:modal-open={locationModalOpen}>
	<div class="modal-box relative max-w-none w-1/3">
		<div class="flex flex-row justify-between items-center">
			<h1 class="font-bold text-2xl">NEW LOCATION</h1>
			<div class="modal-action m-0">
				<button on:click={onClose}>
					<!-- NOTE: Handle Modal -->
					<img class="h-8" src={close} alt="close icon" />
				</button>
			</div>
		</div>
		<p class="py-4">
			Found a new study oasis? Whether it's a bustling coffee shop, a peaceful corner of your home,
			or a scenic outdoor spot, the possibilities are endless. Let's make studying an exciting
			journey!
		</p>
		<form class="grid grid-cols gap-4">
			<input
				type="text"
				placeholder="ENTER THE NAME OF YOUR NEW STUDY OASIS"
				class="input input-bordered w-full"
				bind:value={inputValue}
			/>
			<button class="btn" on:click={() => validateAndSubmit()}>Submit</button>
		</form>
	</div>
</dialog>
