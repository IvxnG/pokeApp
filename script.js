let apiButton = document.getElementById("apiButton");
let apiData = document.getElementById("apiData");
let pokeData = document.querySelector(".pokedex");
let pkm = document.getElementById("pokemonInput");

function callApi() {
    let random = Math.floor(Math.random() * 900) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.value.trim() ? pkm.value.trim() : random}/`)
        .then(res => res.json())
        .then(data => {

            let sprites = data.sprites;

            let types = data.types;
            let typesStr = "";

            types.forEach(type => {
                typesStr += " " + type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
            })

            let abilities = data.abilities;
            let abilitiesStr = "";

            abilities.forEach(ability => {
                abilitiesStr += `${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}  `
            });

            let stats = data.stats;
            let statsSrt = "";
            stats.forEach(stat => {
                switch (stat.stat.name) {
                    case "hp":
                        statsSrt += `<div class="hp bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                    case "attack":
                        statsSrt += `<div class="attack bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                    case "defense":
                        statsSrt += `<div class="defense bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                    case "special-attack":
                        statsSrt += `<div class="special-attack bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                    case "special-defense":
                        statsSrt += `<div class="special-defense bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                    case "speed":
                        statsSrt += `<div class="speed bar" style="width:${stat.base_stat + 50}px">${stat.base_stat}</div> `;
                        break;
                }
                
            });

            pokeData.innerHTML = `
                                <div class="pokemon">
                                    <img src="${sprites.front_default}" alt="Nombre del Pokémon" />
                                    <img src="${sprites.back_default}" alt="Nombre del Pokémon"/>
                                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                                    <p>Pokedex Order: <b>#${data.order}</b></p>
                                    <p>Type: <b>${typesStr} </b></p>
                                    <p>Skills : <b>${abilitiesStr} </b></p>
                                    <p>Height: <b>${data.height} m </b></p>
                                    <p>Weight: <b>${data.weight} kg </b></p>
                                </div>
                                <div class="pokemonStats">
                                    <center><h2>Stats</h2></center>
                                        <center><div class="statsBars">${statsSrt}</div></center>
                                    </div>              
                                `;
        })
        .catch(e => console.error(new Error(e)));
}

apiButton.addEventListener("click", callApi);