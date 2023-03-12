
const pokemomList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;

function convertPokemomToLi(pokemon){

    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
     </li>
     `
}


function loadPokemonItens(offset,limit){
    pokeApi.getPokemoms(offset,limit).then((pokemoms = []) => {
        const listaItens = []
    
        const novaLista = pokemoms.map((pokemon) =>  convertPokemomToLi(pokemon))
    
        const novoHtml = novaLista.join('');
    
            pokemomList.innerHTML += novoHtml;
    
            //pokemomList.innerHTML += pokemoms.map(convertPokemomToLi).join('');
        })
}



/*pokeApi.getPokemoms().then((pokemoms = []) => {
    const listaItens = []

    const novaLista = pokemoms.map((pokemon) =>  convertPokemomToLi(pokemon))

    const novoHtml = novaLista.join('');

        pokemomList.innerHTML += novoHtml;

        //pokemomList.innerHTML += pokemoms.map(convertPokemomToLi).join('');
    }) // mostra os itens do results que no caso são os pokemons

  */  

    loadPokemonItens(offset,limit);
    console.log(`offset ${offset}`)
    loadMoreButton.addEventListener('click',()=> {
        offset += limit
        loadPokemonItens(offset,limit)
        console.log(offset)
    })

    console.log("Sucesso");