<script lang="ts">
	import { onMount } from 'svelte';
	import type { TodoItem } from '../types';

	let todos: TodoItem[] = [];

	onMount(async () => {
		todos = await getIncompleteTodos();
	});

	async function getIncompleteTodos() {
		await new Promise((r) => setTimeout(r, 500));
		let data: TodoItem[] = [
			{ id: 1, text: 'Learn Svelte', completed: false },
			{ id: 2, text: 'Build a Svelte app', completed: false },
			{ id: 3, text: 'Deploy the app', completed: false }
		];

		return data;
	}

	$: console.log(todos);
</script>

<div class="bg-primary w-1/3 h-4/6 p-5 rounded-l-lg drop-shadow-lg">
	<!-- TODO: THIS IS NEXT -->
	<h1 class="text-center font-bold text-2xl">Todo List</h1>

	<div class="h-full flex flex-col justify-between gap-2">
		<div class="mt-5 overflow-auto">
			{#each todos as todoItem}
				<div class="flex gap-2 items-center p-2 bg-secondary rounded-lg my-2">
					<input
						type="checkbox"
						checked={todoItem.completed}
						class="checkbox"
						on:change={() => (todoItem.completed = !todoItem.completed)}
					/>
					<p>{todoItem.text}</p>
				</div>
			{/each}
		</div>
		<button class="btn btn-accent mb-10">Add Todo</button>
	</div>
</div>
