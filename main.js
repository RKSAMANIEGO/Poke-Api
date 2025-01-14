const url = "https://pokeapi.co/api/v2/pokemon/";
const divContenedor = document.getElementById("main-contenedor");
const btnEvent = document.querySelectorAll("button");
const modal = document.querySelector(".modal");

async function fetchPokemonsInOrder() {
  for (i = 1; i <= 500; i++) {
    //CONSUMIR POKEMON POR ID
    const response = await fetch(url + i);
    const data = await response.json();

    //CONSUMIR POKEMON POR SPECIE

    const responseSpecie = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${i}/`
    );
    const information = await responseSpecie.json();

    //ACCEDER AL TIPO DEL POKEMON
    let pokeTipo = data.types.map(
      (obj) => `<p id="${obj.type.name}">${obj.type.name}</p>`
    );
    pokeTipo = pokeTipo.join(" ");

    //FORMATEAR EL ID A 3DIGITOS 00N°
    let numId = data.id;
    const numString = numId.toString();
    if (numString.length === 1) {
      numId = "00" + numString;
    } else if (numString.length === 2) {
      numId = "0" + numString;
    }

    //CREAR EL CONTENEDOR DEL POKEMON
    const divPokemon = document.createElement("div");
    divPokemon.className = "container_body";

    //IMAGEN
    const imagenUrl = data.sprites.other["official-artwork"].front_default;
    const gifUrl = data.sprites.other.showdown.front_shiny;

    //AGREGANDO AL DIV
    divPokemon.innerHTML = `
            <div class="pokemons">

                <h4 class="poke-numero-id ${i}">${numId}</h4>
                <div class="poke-imagen">
                    <img src= ${imagenUrl} alt="pokemon">
                </div>

                <div class="poke-id">
                <p class="id">${"#" + numId}</p>
                <h5 class="nombre">${data.forms[0].name}</h5>
                </div>

                <div class="poke-typs">
                ${pokeTipo}
                </div>
                <div class="poke-info">
                    <p>${data.height + "CM"}</p>
                    <p>${data.weight + "MG"}</p>
                </div>
            </div>

            `;
    divContenedor.appendChild(divPokemon);

    //CLICK A DIV DEL POKEMON
    divPokemon.addEventListener("click", () => {
      modal.style.visibility = "visible";

      let information_Poke_Api = [];
      let rsptaInfo = "";

      for (
        let rec = 0;
        rec < information["flavor_text_entries"].length;
        rec++
      ) {
        if (information["flavor_text_entries"][rec].language.name === "es") {
          information_Poke_Api.push(
            information["flavor_text_entries"][rec]["flavor_text"]
          );
          rsptaInfo = information_Poke_Api.join(" ");
        }
      }

      let infoPoke = document.getElementById("info_poke");
      infoPoke.innerHTML = `
            <div class="pokemons_modal">

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
                        <p>Tamaño: ${data.height + "CM"}</p>
                        <p>Peso: ${data.weight + "MG"}</p>
                    </div>
                    </div>

                    <div class="poke_resenia">
                    <h6 class="resenia">Datos Importantes</h6>

                   
                    <p class="detalle_resenia">${rsptaInfo}</p>
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

//LLAMADA A LA FUNCION
fetchPokemonsInOrder();

let arrayData = [];

//BUSCAR POKEMON
btnEvent.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const botonId = event.currentTarget.id;
    divContenedor.innerHTML = "";
    console.log(botonId);
    arrayData = [];
    let listPromise = [];

    for (let x = 1; x <= 500; x++) {
      listPromise.push(
        fetch(url + x)
          .then((response) => response.json())
          .then((data) => {
            const listTypes = data.types.map((obj) =>
              obj.type.name.toLowerCase()
            );

            if (listTypes.some((tipo) => tipo.includes(botonId))) {
              //DATOS
              arrayData.push(data);
            }
          })
      );
    }
    Promise.all(listPromise)
      .then(() => {
        console.log(arrayData.length);

        const rptaOrdenada=arrayData.sort((a,b)=> a.id -b.id);

        console.log(rptaOrdenada);

        dataSearch(rptaOrdenada);
      })
      .catch((error) => {
        console.error(error);
      });
  })
);

async function dataSearch(arrayData) {
    divContenedor.innerHTML = "";

  for (let i = 0; i < arrayData.length; i++) {
    //CONSUMIR POKEMON POR SPECIE
    const data = arrayData[i];
    const idObj = arrayData[i].id;

    const responseSpecie = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${idObj}/` );
    const information = await responseSpecie.json();

    //ACCEDER AL TIPO DEL POKEMON
    let pokeTipo = data.types.map((obj) => `<p id="${obj.type.name}">${obj.type.name}</p>`);
    pokeTipo = pokeTipo.join(" ");

    //FORMATEAR EL ID A 3DIGITOS 00N°
    let numId = data.id;
    const numString = numId.toString();
    if (numString.length === 1) {
      numId = "00" + numString;
    } else if (numString.length === 2) {
      numId = "0" + numString;
    }

    //CREAR EL CONTENEDOR DEL POKEMON
    const divPokemon = document.createElement("div");
    divPokemon.className = "container_body";

    //IMAGEN
    const imagenUrl = data.sprites.other["official-artwork"].front_default;
    const gifUrl = data.sprites.other.showdown.front_shiny;

    //AGREGANDO AL DIV
    divPokemon.innerHTML = `
         <div class="pokemons">

             <h4 class="poke-numero-id ${i}">${numId}</h4>
             <div class="poke-imagen">
                 <img src= ${imagenUrl} alt="pokemon">
             </div>

             <div class="poke-id">
             <p class="id">${"#" + numId}</p>
             <h5 class="nombre">${data.forms[0].name}</h5>
             </div>

             <div class="poke-typs">
             ${pokeTipo}
             </div>
             <div class="poke-info">
                 <p>${data.height + "CM"}</p>
                 <p>${data.weight + "MG"}</p>
             </div>
         </div>

         `;
    divContenedor.appendChild(divPokemon);

    //CLICK A DIV DEL POKEMON
    divPokemon.addEventListener("click", () => {

        
      let information_Poke_Api = [];
      let rsptaInfo = "";

      for ( let rec = 0; rec < information["flavor_text_entries"].length; rec++) {
        if (information["flavor_text_entries"][rec].language.name === "es") {
          information_Poke_Api.push(
            information["flavor_text_entries"][rec]["flavor_text"]
          );
          rsptaInfo = information_Poke_Api.join(" ");
        }
      }

        let informacion=`
        <div class="pokemons_modal">

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
                    <p>Tamaño: ${data.height + "CM"}</p>
                    <p>Peso: ${data.weight + "MG"}</p>
                </div>
                </div>

                <div class="poke_resenia">
                <h6 class="resenia">Datos Importantes</h6>

                <p class="detalle_resenia">${rsptaInfo}</p>
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
        localStorage.setItem("info",informacion);
        window.location.href="modal.html";
    });
  }
}

//MODAL
const close = document.querySelector(".close");

close.addEventListener("click", () => {
  modal.style.visibility = "hidden";
});
