<script lang="ts">
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
</script>

<Navigation />

<div class="bg-gradient-to-br from-gradient-color-1 via-gradient-color-2 to-gradient-color-3">
	<slot />
</div>
