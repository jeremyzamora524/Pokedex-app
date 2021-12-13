
let pokemonRespository = (function () {

let pokemonList = [
    {name:'balbasur', type:'grass', height: 0.7},
    {name:'chalmander', type:'fire', height: 0.6},
    {name:'squirtle', type:'water', height: 0.5}
];


function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  
  function getAll() {
    return pokemonList;
  };

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  
 
  function showDetails(pokemon){
    console.log(pokemon.name);
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
  
  
  pokemonRespository.getAll().forEach(function(pokemon) {
   pokemonRespository.addListItem(pokemon);
  });
  

