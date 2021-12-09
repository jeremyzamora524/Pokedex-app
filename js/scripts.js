
let pokemonList = [
    {name:'balbasur', type:'grass', height: 0.7},
    {name:'chalmander', type:'fire', height: 0.6},
    {name:'squirtle', type:'water', height: 0.5}
];

for (let i=0; i < pokemonList.length; i++){
 document.write('<br>' + pokemonList[i].name + (' ,height:') + pokemonList[i].height);
 if (pokemonList[i].height >0.6){
document.write(' -- Big Pokemon');
 }
}