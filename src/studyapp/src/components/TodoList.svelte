<script lang="ts">
	export let todos: TodoItem[] = [];
	export let onOpen: () => void;
	import type { TodoItem } from '../types';
</script>

<div class="bg-primary w-1/3 h-4/6 p-5 rounded-l-lg drop-shadow-lg">
	<!-- TODO: THIS IS NEXT -->
	<h1 class="text-center font-bold text-2xl">Todo List</h1>

	<div class="h-full flex flex-col justify-between gap-2">
		<div class="mt-5 overflow-auto">
			{#if todos.length === 0}
				<p class="text-center">Write down what you want to acheive this session!</p>
			{:else}
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
			{/if}
		</div>
		<button class="btn btn-accent mb-10" on:click={onOpen}>Add Todo</button>
	</div>
</div>
