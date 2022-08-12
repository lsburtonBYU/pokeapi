const getStats = (name = 'ditto') =>
	fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then((response) => {
			if (!response || !response.ok) throw new Error('Something not right with response');
			else return response.json();
		})
		.then((data) => data)
		.catch((error) => {
			return { results: null, error: error };
		});

export async function GET(args) {
	const items = await getStats(args.url.searchParams.get('name'));

	return {
		body: { items }
	};
}
