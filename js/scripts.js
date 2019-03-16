// IIFE wrap
var pokemonRepository = (function(){
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

    //returns an array of values being pushed by the 'add()' function
    function getAll(){
        return repository;
    }

    // pushes any values from 'loadList' function to the 'repository' array
    function add(item){
        return repository.push(item);
    }

    //builds list of pokemon and append it to DOM
    function addListItem(pokemon){
        var $singlePokemon = document.createElement('li');
        var $pokemonInfoButton = document.createElement('button');
        var $body = document.querySelector('body');

        //adding classes to elements
        $singlePokemon.classList.add('poke-list__item');
        $pokemonInfoButton.classList.add('poke-button');

        //setting attribute to button and set its inner text to pokemon's name
        $pokemonInfoButton.setAttribute('type', 'button');
        $pokemonInfoButton.innerText = pokemon.name;

        //appending element in DOM
        $singlePokemon.appendChild($pokemonInfoButton );
        $body.appendChild($singlePokemon);

        //event listener on button that shows pokemon's detail in the console
        $pokemonInfoButton.addEventListener('click', function(event)
        {
         showDetails(pokemon);
        });
    }

    //fetch pokemon data from API and loop it in a json 'pokemon' object
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
            var pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
        }).catch(function (e) {
            console.error(e);
        });
    }

    // from 'pokemon' object fetches details: img, height and type
    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
        }).catch(function (e) {
            console.error(e);
        });
    }

    //  response of '$pokemonInfoButton' event
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // returning all functions values occur inside the IFEE scope
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

}) ();//IIFE wrap

// iterate for each pokemon printing it in DOM
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
