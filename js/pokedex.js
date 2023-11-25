let pokedexPoke = document.getElementById("pokedexPoke");
pokedexPoke.innerHTML = "";
let page = 50;
function showAll() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page}&offset=0`)
        .then(res => res.json())
        .then(data => {
            let pokemons = data.results;
            console.log(pokemons);
            pokemons.forEach(pokemon => {
                console.log(pokemon.url);
                fetch(`${pokemon.url}`)
                    .then(res => res.json())
                    .then(data => {

                        let sprites = data.sprites;

                        let types = data.types;
                        let typesStr = "";

                        types.forEach(type => {
                            typesStr += `<img src="../tipos/${type.type.name}.png" class="pkmType"></img>`;
                        })
                        let abilities = data.abilities;
                        let abilitiesStr = "";

                        abilities.forEach(ability => {
                            abilitiesStr += `${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}  `
                        });

                        pokedexPoke.innerHTML += `
                                <center>
                                <div class="pokemon">
                                    <img src="${sprites.front_default}" class="pokeImg" alt="Nombre del Pokémon" />
                                    <img src="${sprites.back_default}" class="pokeImg" alt="Nombre del Pokémon"/>
                                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                                    <p>Pokedex Order: <b>#${data.order}</b></p>
                                    <p><b>${typesStr}</b></p>
                                    <p>Skills : <b>${abilitiesStr} </b></p>
                                    <p>Height: <b>${data.height / 10} m </b></p>
                                    <p>Weight: <b>${data.weight / 10} kg </b></p>
                                </div>
                                </center>
                                `;
                    })
                    .catch(e => console.log(new Error(e)))
            });
        })
        .catch(e => console.log(e));
}
showAll()
