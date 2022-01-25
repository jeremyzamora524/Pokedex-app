//IIFE function
let pokemonRepository = (function () {
  //list of pokemon Array
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=333";
  //let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let $row = $(".row");

      let $card = $('<div class="card" style="width:400px"></div>');
      let $image = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      let $cardBody = $('<div class="card-body"></div>');
      let $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      let $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $row.append($card);
      //Append the image to each card
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.height = details.height;
        //loop for each ofthe pokemon types.
        //Also changing the background color depend on each pokemon type.
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        // item.types = [];
        // details.types.forEach(function (i) {
        //   item.types.push(i.type.name);
        // });
        //loop to get the abilities of a selected pokemon
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }

        pokemon.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // show the modal content
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    // let $modalContainer = $("#modal-container");
    //clear existing content of the model
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
    // //creating element for type in modal content
    let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
    // //creating element for abilities in modal content
    let abilitiesElement = $(
      "<p>" + "abilities : " + pokemon.abilities + "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});