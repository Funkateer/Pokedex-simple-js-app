var pokemonRepository = (function(){
    var repository = [];
    //Pokemon API
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function getAll(){
        return repository
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

    // fetch pokemon detail from APIs
    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(apiUr).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
        }).catch(function (e) {
            console.error(e);
        });
    }

    //show-details function:
    function showDetails(pokemon)
    {
      console.log( pokemon.name ,  pokemon.height , pokemon.type );
    }
    
    // returning the al functions outputs to be used outside the IFEE 
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }

}) ();

pokemons = pokemonRepository.getAll();

pokemons.forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
