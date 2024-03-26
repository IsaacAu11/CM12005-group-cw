<script lang="ts">
	import Timer from '../components/Timer.svelte';
	import create from '$lib/assets/create.svg';
	import close from '$lib/assets/close.svg';
	import { onMount } from 'svelte';
	let inStudyMode: boolean = true;
	let selectedLocation: string = '';
	let locationModalOpen = false;
	let newStudyLocation: string = '';
	let savedLocations: string[] = [];
    let rerenderSavedLocations = 0;

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-warning';

	$: selectText = selectedLocation ? `${selectedLocation}` : 'Your Saved Study Locations';

	onMount(async () => {
		savedLocations = await getSavedLocations();
	});

	async function getSavedLocations() {
		await new Promise((r) => setTimeout(r, 500));
		return ['Library', 'Home', 'Cafe'];
	}

	async function validateAndSubmit() {
		if (newStudyLocation) {
			await new Promise((r) => setTimeout(r, 500));
			savedLocations.push(newStudyLocation);
            rerenderSavedLocations++;
			// TODO: Insert new location into database
			newStudyLocation = '';
			locationModalOpen = false;
		}
	}
</script>

<div class="h-screen flex flex-col items-center justify-end drop-shadow-2xl">
	<div class="pt-5 pl-5 pr-5 w-1/2 h-5/6 rounded-lg {bgColor}">
		<div class="mb-2 flex justify-around md:flex-auto">
			<div class="grid grid-cols-2 gap-2">
				<select class="select select-accent w-full max-w-xs bg-accent">
					<option disabled selected>{selectText}</option>
                    <!-- NOTE: Needed to use extra variable because key doesnt rerender on list push -->
					{#key rerenderSavedLocations}
						{#each savedLocations as location}
							<option value={location} on:click={() => (selectedLocation = location)}
								>{location}</option
							>
						{/each}
					{/key}
				</select>
				<button
					class="btn btn-accent aspect-square border-transparent"
					on:click={() => (locationModalOpen = true)}
				>
					<img class="h-8" src={create} alt="create icon" />
				</button>
			</div>
			{#if inStudyMode}
				<button on:click={toggleStudyMode} class="btn btn-accent">Study Mode</button>
			{:else}
				<button on:click={toggleStudyMode} class="btn btn-secondary">Break Mode</button>
			{/if}
		</div>
		{#key inStudyMode}
			<Timer {inStudyMode} />
		{/key}
	</div>
</div>
<dialog class="modal" class:modal-open={locationModalOpen}>
	<div class="modal-box relative max-w-none w-1/3">
		<div class="flex flex-row justify-between items-center">
			<h1 class="font-bold text-2xl">NEW LOCATION</h1>
			<div class="modal-action m-0">
				<button on:click={() => (locationModalOpen = false)}>
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
				bind:value={newStudyLocation}
			/>
			<button class="btn" on:click={() => validateAndSubmit()}>Submit</button>
		</form>
	</div>
</dialog>
