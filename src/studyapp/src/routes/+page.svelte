<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { LocationData, TodoItem } from '../types';
	import Timer from '../components/Timer.svelte';
	import Reflection from '../components/Reflection.svelte';
	import NewLocationModal from '../components/modals/NewLocationModal.svelte';
	import LocationSelector from '../components/LocationSelector.svelte';
	import TodoList from '../components/TodoList.svelte';
	import NewTodoModal from '../components/modals/NewTodoModal.svelte';
	import GoalSetting from '../components/GoalSetting.svelte';
	import ChangeProductivityGoalModal from '../components/modals/ChangeProductivityGoalModal.svelte';

	let inStudyMode: boolean = true;

	let timerStarted: boolean = false; // Set by Timer child component

	let showReflection: boolean = false;

	let locationModalOpen = false;
	let savedLocations: LocationData[] = [];
	let selectedLocation: LocationData | null = null;

	let newTodoModalOpen = false;
	let todos: TodoItem[] = [];

	let studyDurationMinutes: number;

	let productivityGoalModalOpen = false;
	let productivityScore: number = 0;

	function toggleStudyMode() {
		inStudyMode = !inStudyMode;
	}

	$: bgColor = inStudyMode ? 'bg-secondary' : 'bg-warning';

	onMount(async () => {
		savedLocations = await getSavedLocations();
		todos = await getIncompleteTodos();
		productivityScore = await getProductivityScoreTarget();
	});

	async function getSavedLocations() {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 50));
		let data: LocationData[] = [
			{ id: 1, name: 'Library' },
			{ id: 2, name: 'Home' },
			{ id: 3, name: 'Cafe' }
		];

		return data;
	}

	async function getIncompleteTodos() {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 50));
		let data: TodoItem[] = [
			{ id: 1, text: 'Learn Svelte', completed: false },
			{ id: 2, text: 'Build a Svelte app', completed: false },
			{ id: 3, text: 'Deploy the app', completed: false }
		];

		return data;
	}

	async function getProductivityScoreTarget() {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 50));
		return 8;
	}

	async function insertIntoDatabase(
		productivity: number,
		mood: number,
		studyDurationMinutes: number,
		selectedLocation: LocationData | null
	) {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 500));
		console.log(productivity, mood, studyDurationMinutes, selectedLocation);
	}

	async function updateTodosInDatabase(completedTodos: TodoItem[]) {
		// TODO: Database Operation
		await new Promise((r) => setTimeout(r, 500));
		console.log('Updated todos:', completedTodos);
	}
</script>

<div class="h-screen flex items-center justify-between">
	<!-- Main Component and Todo Component -->
	<div class="w-full h-full flex flex-col items-center justify-end">
		<div class="pt-5 px-5 w-3/4 h-5/6 rounded-lg {bgColor} drop-shadow-2xl">
			<div class="h-full flex flex-col items-center">
				{#if !timerStarted}
					<!-- NOTE: Location Dropdown, Location Button and Study/Break Toggle -->
					<div
						class="mb-2 flex justify-around md:flex-auto"
						in:fade={{ delay: 500, duration: 150 }}
						out:fade={{ delay: 50, duration: 250 }}
					>
						<LocationSelector
							showCreateButton={true}
							{savedLocations}
							onOpen={() => (locationModalOpen = true)}
							onSelected={(location) => {
								selectedLocation = location;
							}}
						/>
						{#if inStudyMode}
							<button on:click={toggleStudyMode} class="btn btn-accent">Study Mode</button>
						{:else}
							<button on:click={toggleStudyMode} class="btn btn-secondary">Break Mode</button>
						{/if}
					</div>
				{/if}
				{#if !showReflection}
					<GoalSetting
						score={productivityScore}
						onOpen={() => (productivityGoalModalOpen = true)}
					/>
				{/if}
				{#if !showReflection}
					{#key inStudyMode}
						<Timer
							{inStudyMode}
							bind:timerStarted
							onComplete={(durationMinutes) => {
								showReflection = true;
								studyDurationMinutes = durationMinutes;
							}}
						/>
					{/key}
				{:else}
					<Reflection
						onSubmit={async (productivity, mood) => {
							await insertIntoDatabase(productivity, mood, studyDurationMinutes, selectedLocation);

							todos = todos.filter((todo) => !todo.completed);
							await updateTodosInDatabase(todos);
							showReflection = false;
							studyDurationMinutes = 0;
						}}
					/>
				{/if}
			</div>
		</div>
	</div>
	<TodoList
		{todos}
		onOpen={() => {
			newTodoModalOpen = true;
		}}
	/>
</div>

<NewLocationModal
	{locationModalOpen}
	onClose={() => (locationModalOpen = false)}
	onSubmit={(newLocation) => {
		savedLocations = [...savedLocations, newLocation];
		locationModalOpen = false;
	}}
/>

<NewTodoModal
	{newTodoModalOpen}
	onClose={() => (newTodoModalOpen = false)}
	onSubmit={(newTodo) => {
		todos = [...todos, newTodo];
		newTodoModalOpen = false;
	}}
/>

<ChangeProductivityGoalModal
	{productivityGoalModalOpen}
	onClose={() => (productivityGoalModalOpen = false)}
	onSubmit={async (newGoal) => {
		productivityScore = newGoal;
		productivityGoalModalOpen = false;
	}}
/>
