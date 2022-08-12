const getPokemon = (offset = 0, limit = 10) =>
	fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
		.then((response) => {
			if (!response || !response.ok) throw new Error('Something not right with response');
			else return response.json();
		})
		.then((data) => data)
		.catch((error) => {
			return { results: null, error: error };
		});

export async function GET(args) {
	const offset = args.url.searchParams.get('offset') || 0;
	const limit = args.url.searchParams.get('limit') || 10;
	const items = await getPokemon(offset, limit);

	return {
		status: 200,
		headers: {
			'access-control-allow-origin': '*'
		},
		body: { items }
	};
}
