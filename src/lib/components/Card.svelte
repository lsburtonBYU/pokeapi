<script>
	export let name = 'charizard';
	export let imageURL =
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png';
	export let imageWidth = '100px';
	let properName = name.charAt(0).toUpperCase() + name.slice(1);
</script>

<div class="card">
	<img src={imageURL} loading="lazy" alt={name} style="width: {imageWidth}" />
	<p>{properName}</p>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid black;
		background-color: #fff;
	}

	.card img {
		filter: drop-shadow(6px 8px 6px #0063);
	}
</style>
