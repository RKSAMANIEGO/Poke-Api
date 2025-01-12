const url ="https://pokeapi.co/api/v2/pokemon/";
const divContenedor=document.getElementById("main-contenedor");
const btnEvent=document.querySelectorAll("button")
const modal=document.querySelector(".modal");

async function fetchPokemonsInOrder() {

    for( i=1 ; i<=999; i++){

        //CONSUMIR POKEMON POR ID
        const response = await fetch(url + i);
        const data = await response.json();

        //CONSUMIR POKEMON POR SPECIE
       
        
            const responseSpecie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
            const information=await responseSpecie.json();
            console.log(information);
        

        let pokeTipo= data.types.map(obj => `<p id="${obj.type.name}">${obj.type.name}</p>` );
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

                <h4 class="poke-numero-id ${i}">${numId}</h4>
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

            //CLICK A DIV DEL POKEMON
            divPokemon.addEventListener("click",()=>{
                modal.style.display="block";

          

                let infoPoke=document.getElementById("info_poke");
                infoPoke.innerHTML=`
            <div class="pokemons_modal">

            <!-- <h4 class="poke-numero-id ${i}">${numId}</h4>-->

                <div class="poke_imagen_modal">
                    <img src= ${imagenUrl} alt="pokemon">
                </div>

                <div class="poke_info_modal">

                    <div class="poke-id-modal">
                        <p class="bg-id">&#3356 ${numId}</p>
                        <h6 class="bg-nombre">${data.forms[0].name}</h6>
                    </div>

                    <div class="container_div_modal">
                    <div class="poke-typs-modal">
                        ${pokeTipo}
                    </div>

                    <div class="poke-info-datos">
                        <p>Tamaño: ${data.height+"CM"}</p>
                        <p>Peso: ${data.weight+"MG"}</p>
                    </div>
                    </div>

                    <div class="poke_resenia">
                    <h6 class="resenia">Datos Importantes</h6>

                    <p class="detalle_resenia">${information["flavor_text_entries"][79]["flavor_text"]}</br> </br>${information["flavor_text_entries"][89]["flavor_text"]}</p>

                    <p class="detalle_resenia estrella">

                    <span>&#9733</span>
                    <span>&#9733</span>
                    <span>&#9733</span>
                    <span>&#9734</span>
                    <span>&#9734</span>
            
                    </p>
                    </div>

                </div>
            </div>

            `;

           
            });

        

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
}));




//MODAL
const close=document.querySelector(".close");

close.addEventListener("click",()=>{
    modal.style.display="none";
});


