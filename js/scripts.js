// IIFE wrap
var pokemonRepository = (function(){
    var repository = [];
    //variables holds the Pokemon API
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function getAll(){
        return repository;
    }

    function add(item){
        return repository.push(item);
    }

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

    //fetch pokemon list from its APIs
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

    // fetch pokemon detail (img, height and type) using promises callback
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

    //  showDetails(pokemon);
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // returning the al functions outputs to be used outside the IFEE
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
