<script lang="ts">
	export let locationModalOpen: boolean;
	export let onClose: () => void;
	export let onSubmit: (newLocation: LocationData) => void;

	import TextQuestionModal from './TextQuestionModal.svelte';
	import type { LocationData } from '../../types';

	function isValidString(fieldText: string) {
		if (fieldText !== '') {
			return true;
		}

		return false;
	}

	async function insertIntoDatabase(fieldText: string) {
        // TODO: Database Operation
		await new Promise((r) => setTimeout(r, 500));
		let dbNewRow: LocationData = { id: 9999, name: fieldText };
		onSubmit(dbNewRow);
	}
</script>

<TextQuestionModal
	modalOpen={locationModalOpen}
	title="NEW LOCATION"
	description="Found a new study oasis? Whether it's a bustling coffee shop, a peaceful corner of your home, or a scenic outdoor spot, the possibilities are endless. Let's make studying an exciting journey!"
	fieldPlaceholderText="ENTER THE NAME OF YOUR NEW STUDY OASIS"
	{onClose}
	onSubmit={insertIntoDatabase}
	validationFunction={isValidString}
/>
