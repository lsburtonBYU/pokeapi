<script>
	// The page always has access to props from `GET`...
	export let items;
	// ...plus props from `POST` when the page is rendered
	// in response to a POST request, for example after
	// submitting the form below
	export let errors;

	const pokeList = items.results;
	const offset = 0;

	console.log(items.results);
	console.log(errors);
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="a test of the pokeapi" />
</svelte:head>
<div class="content">
	<div class="list">
		{#each pokeList as pokemon, i}
			<div class="card">
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
						i + 1
					}.png`}
					loading="lazy"
					alt={pokemon.name}
					style="width: 100px"
				/>

				<p class="name">{pokemon.name}</p>
			</div>
		{/each}

		{#if errors?.title}
			<p class="error">{errors.title}</p>
		{/if}
	</div>
</div>

<style>
	.content {
		width: 100%;
		margin: var(--column-margin-top) auto 0 auto;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
		margin: 1rem;
	}

	.list > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid black;
		background-color: #fff;
	}

	.list img {
		filter: drop-shadow(6px 8px 6px #0063);
	}

	.name {
		text-transform: capitalize;
	}
</style>
