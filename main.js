const url ="https://pokeapi.co/api/v2/pokemon/";
const divContenedor=document.getElementById("main-contenedor");
const btnEvent=document.querySelectorAll("button")
async function fetchPokemonsInOrder() {

    for( i=1 ; i<=999; i++){

        const response = await fetch(url + i);
        const data = await response.json();

        let pokeTipo=data.types.map(obj=> `<p id="${obj.type.name}">${obj.type.name}</p>` );
        pokeTipo=pokeTipo.join(" ");

        let numId=data.id;
        const numString=numId.toString();
        if(numString.length===1){
            numId="00"+numString;
        }else if(numString.length===2){
            numId="0"+numString;
        }

            const divPokemon= document.createElement("div");
            divPokemon.className="container_body";
            const imagenUrl=data.sprites.other["official-artwork"].front_default;
            const gifUrl=data.sprites.other.showdown.front_shiny;
            divPokemon.innerHTML=`
            <div class="pokemons">

                <h4 class="poke-numero-id">${numId}</h4>
                <div class="poke-imagen">
                    <img src= ${imagenUrl} alt="pokemon">
                </div>

                <div class="poke-id">
                <p class="id">${"#"+numId}</p>
                <h5 class="nombre">${data.forms[0].name}</h5>
                </div>

                <div class="poke-typs">
                ${pokeTipo}
                </div>
                <div class="poke-info">
                    <p>${data.height+"CM"}</p>
                    <p>${data.weight+"MG"}</p>
                </div>
            </div>

            `;
            divContenedor.appendChild(divPokemon);

        }
    }
    fetchPokemonsInOrder();

    btnEvent.forEach(boton => boton.addEventListener("click",(event)=>{
        const botonId=event.currentTarget.id;
        divContenedor.innerHTML=" ";

        for(let i=1 ; i<=100; i++){
        fetch(url+i)
        .then(response => response.json())
        .then(data => {
                const listTypes=data.types.map(obj => obj.type.name);
                if(listTypes.some(tipo => tipo.includes(botonId))){
                    fetchPokemonsInOrder();
                }
        });
    }
}))

