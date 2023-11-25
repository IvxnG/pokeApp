let apiButton = document.getElementById("apiButton");
let apiData = document.getElementById("apiData");
let pokeData = document.querySelector(".pokedex");
let pkm = document.getElementById("pokemonInput");

function callApi() {
    let random = Math.floor(Math.random() * 1016) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.value.trim() ? pkm.value.trim().toLowerCase() : random}/`)
        .then(res => res.json())
        .then(data => {

            let sprites = data.sprites;

            let types = data.types;
            let typesStr = "";

            //Nombre del tipo 
            // types.forEach(type => {
            //     typesStr += " " + type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
            // })

            //img del tipo
            types.forEach(type => {
                typesStr += `<img src="/tipos/${type.type.name}.png" class="pkmType"></img>`;
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
                        statsSrt += `<p>Hp</p><div class="hp bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                    case "attack":
                        statsSrt += `<p>Attack</p><div class="attack bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                    case "defense":
                        statsSrt += `<p>Defence</p><div class="defense bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                    case "special-attack":
                        statsSrt += `<p>Spd.Attack</p><div class="special-attack bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                    case "special-defense":
                        statsSrt += `<p>Spd.Defence</p><div class="special-defense bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                    case "speed":
                        statsSrt += `<p>Speed</p><div class="speed bar" style="width:${stat.base_stat + 60}px">${stat.base_stat}</div> `;
                        break;
                }
                
            });

            pokeData.innerHTML = `
                                <div class="pokemon">
                                    <img src="${sprites.front_default}" class="pokeImg" alt="Front image not available" />
                                    <img src="${sprites.back_default}" class="pokeImg" alt="Back image not available"/>
                                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                                    <p>Pokedex Order: <b>#${data.order}</b></p>
                                    <p><b>${typesStr}</b></p>
                                    <p>Skills : <b>${abilitiesStr} </b></p>
                                    <p>Height: <b>${data.height/10} m </b></p>
                                    <p>Weight: <b>${data.weight/10} kg </b></p>
                                </div>
                                <div class="pokemonStats">
                                    <center><h2>Stats</h2></center>
                                        <center><div class="statsBars">${statsSrt}</div></center>
                                    </div>              
                                `;
        })
        .catch(e => alert("The name of the Pokemon is not correct"));
}

function handleApiButtonClick() {
    apiButton.removeEventListener("click", handleApiButtonClick);
    callApi();
    setTimeout(() => {
        apiButton.addEventListener("click", handleApiButtonClick);
    }, 1000); // Espera 1 segundo antes de permitir otro clic
}

apiButton.addEventListener("click", handleApiButtonClick);




