
let pokemonRespository = (function () {
//The Pokemon List

  let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
let modalContainer = document.querySelector("modal-container");


function add(pokemon) {
  if (typeof pokemon === 'object') {
    pokemonList.push(pokemon);
  } else {
    console.log('This pokemon is not an object');
  }
}
  
  
  function getAll() {
    return pokemonList;
  }

  
  function addListItem(pokemon) {
    // Pokemon list in HTML
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let container = document.createElement('button');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    container.classList.add('pokeball');
    button.classList.add('name');

    container.appendChild(button);
    pokemonItem.appendChild(container);
    pokemonList.appendChild(pokemonItem);

    onclickEventListener(button, pokemon);
  }

  function onclickEventListener(element, object) {
    element.addEventListener('click', function () {
      showDetails(object);
    });
  }
  
  const loader = document.querySelector('#loading');

  function showLoadingMessage() {
    loader.classList.add('show');
  }

  function hideLoadingMessage() {
    loader.classList.remove('show');
  }
 
  function loadList() {
   showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then (function (json) {
     hideLoadingMessage();
     json.results.forEach(function (pokemon) {
       let pokemon = {
         name: pokemon.name,
         detailsUrl: pokemon.url
       };

       add(pokemon);

     });
   }).catch(function (e) {
     hideLoadingMessage();
     console.error(e);
   });
 }


 function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url).then (function (response) {
    return response.json();
  }).then (function (details) {
    pokemon.imageUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.types = details.types;
}).catch (function (e) {
  console.error(e);
});
}



function showModal(pokemon) {
  modalContainer.innerHTML = " ";


let modal = document.createElement("div");
modal.classList.add('modal');

let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add = ('modal-close');
    closeButtonElement.innerText = 'CLose';
    closeButtonElement.addEventListener('click', hideModal);


let titleElement = document.createElement("h2");
    titleElement.classList.add("title-element");
    titleElement.innerText = pokemon.name;

let imageElement = document.createElement("img");
    imageElement.classList.add('pokemon-picture');
    imageElement.src = pokemon.imageUrl;

let heightElement = document.createElement("p");
    heightElement.classList.add("height-element");
    heightElement.innerText = "Height:" + pokemon.height;


modal.appendChild(closeButtonElement);
modal.appendChild(imageElement);
modal.appendChild(titleElement);
modal.appendChild(heightElement);
modalContainer.appendChild(modal);

modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.cllasList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
  
    pokemonRespository.loadList().then(function() {
      pokemonRespository.getAll().forEach(function(pokemon) {
        pokemonRespository.addListItem(pokemon);
    });
   });
  

