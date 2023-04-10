async function getPokemons(limit, offset) {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`)
    let json = await res.json();
    return json;
}