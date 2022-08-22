<script>
	export let items;

	let pokemon = items.results;
</script>

{#each pokemon as stat}
	<p>{stat}</p>
{/each}
