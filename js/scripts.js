
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
  }
  
  return {
    add: add,
    getAll: getAll
  };
  
  
  })();
  
  
  pokemonRespository.getAll().forEach(function(pokemon) {
    document.write('<p>' +  pokemon.name + '   ' + ' Height: ' + pokemon.height + ' Type: ' + pokemon.type + '</p>');
  });
  

