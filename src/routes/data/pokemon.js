const getPokemon = (limit = 10) =>
	fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
		.then((response) => {
			if (!response || !response.ok) throw new Error('Something not right with response');
			else return response.json();
		})
		.then((data) => data)
		.catch((error) => {
			return { results: null, error: error };
		});

export async function GET(args) {
	const items = await getPokemon(args.url.searchParams.get('limit'));

	return {
		body: { items }
	};
}
