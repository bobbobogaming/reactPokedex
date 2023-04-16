class Pokemon {
    id
    name
    sprite
    flavorText
    types
    stats
    abilities
    height
    weight
}

export class PokemonPager{
    POKEMONS_PER_PAGE = 16;
    currentUrl = {}
    next = null
    prev = null
    pageNo = 1;
    maxPageNo;
    constructor(){
        this.current = new URL(`https://pokeapi.co/api/v2/pokemon-species?limit=${this.POKEMONS_PER_PAGE}&offset=0`);
    }

    async handleFetch(responseJson){
        this.next = responseJson.next?new URL(responseJson.next):null;
        this.prev = responseJson.previous?new URL(responseJson.previous):null;
        let pokemonsList = [];
        for (let i = 0; i < responseJson.results.length; i++) {
            pokemonsList.push({
                id: i+1+parseInt(this.current.searchParams.get("offset")),
                name: responseJson.results[i].name.replace(/^[a-zA-Z]/g,responseJson.results[i].name.charAt(0).toUpperCase())
            })
        }
        return {pageNo: this.pageNo, maxPageNo: this.maxPageNo, pokemons: pokemonsList};
    }

    async fetchCurrent(){
        let response = await fetch(this.current);
        let responseJson = await response.json();
        this.maxPageNo = Math.ceil(responseJson.count/this.POKEMONS_PER_PAGE);
        
        return this.handleFetch(responseJson)
    }
    
    async fetchNext(){
        if (this.next !== null){
            let response = await fetch(this.next);
            let responseJson = await response.json();
            this.current = new URL(this.next);
            this.pageNo++;
            return this.handleFetch(responseJson)
        }
    }

    async fetchPrev(){
        if (this.prev !== null) {
            let response = await fetch(this.prev);
            let responseJson = await response.json();
            this.current = new URL(this.prev);
            this.pageNo--;
            return this.handleFetch(responseJson)
        }
    }
}

async function getPokemon(pokemonName) {
    let pokemonResponses = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    ]);
    let pokemonResponseJson = await pokemonResponses[0].json();
    let pokemonSpeciesResponseJson = await pokemonResponses[1].json();

    let pokemon = new Pokemon();

    pokemon.id = pokemonResponseJson["id"];
    pokemon.name = pokemonResponseJson["name"].replace(/^[a-zA-Z]/g, pokemonResponseJson["name"].charAt(0).toUpperCase());
    pokemon.sprite = pokemonResponseJson["sprites"]["other"]["official-artwork"]["front_default"];
    pokemon.flavorText = pokemonSpeciesResponseJson["flavor_text_entries"][0]["flavor_text"];
    pokemon.types = pokemonResponseJson["types"].map(typeEntry => typeEntry["type"]["name"]);
    pokemon.stats = new Map(pokemonResponseJson["stats"].map(statEntry => [statEntry["stat"]["name"], statEntry["base_stat"]]));
    pokemon.abilities = pokemonResponseJson["abilities"].map(abilityEntry => abilityEntry["ability"]["name"]);
    pokemon.height = pokemonResponseJson["height"];
    pokemon.weight = pokemonResponseJson["weight"];

    return pokemon;
}