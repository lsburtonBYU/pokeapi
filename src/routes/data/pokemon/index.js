const getPokemon = () =>
	fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
		.then((response) => {
			if (!response || !response.ok) throw new Error('Something not right with response');
			else return response.json();
		})
		.then((data) => data)
		.catch((error) => {
			return { results: null, error: error };
		});

export async function GET() {
	const items = await getPokemon();

	return {
		body: { items }
	};
}
