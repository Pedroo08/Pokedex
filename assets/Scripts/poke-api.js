
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.order = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const  types = pokeDetail.types = pokeDetail
    .types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

   return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemoms = (offset =0, limit =5) => {
    const url =  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) =>  response.json()) // converte o response para json

    .then((jsonBody) =>  jsonBody.results) // returna o results do reponseBody

    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))

    .then((detailResquest) => Promise.all(detailResquest))

    .then((pokemonsDetails)=> pokemonsDetails)

    .catch((error) => console.error(error))
}


