<script lang="ts">
	export let newTodoModalOpen: boolean;
	export let onClose: () => void;
	export let onSubmit: (newTodo: TodoItem) => void;

	import TextQuestionModal from './TextQuestionModal.svelte';
	import type { TodoItem } from '../../types';

	function isValidString(fieldText: string) {
		if (fieldText !== '') {
			return true;
		}

		return false;
	}

	async function insertIntoDatabase(fieldText: string) {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 500));
		let dbNewRow: TodoItem = { id: 9999, text: fieldText, completed: false };
		onSubmit(dbNewRow);
	}
</script>

<TextQuestionModal
	modalOpen={newTodoModalOpen}
	title="NEW TODO"
	description="Your next action item! This is your chance to write down your next task, goal, or reminder. Let's make it a productive day!"
	fieldPlaceholderText="ENTER YOUR NEW TODO"
	{onClose}
	onSubmit={insertIntoDatabase}
	validationFunction={isValidString}
/>
