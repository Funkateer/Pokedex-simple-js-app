var pokemonRepository = (function(){
    var repository = [
        {name: 'Bulbasaur',
        height: 0.7,
        type: ['Grass','Poison']
        },
        {name: 'Charmander',
        height: 0.6,
        type: ['Fire']
        },
        {name: 'Squirtle',
        height: 0.5,
        type: ['Water']
        },
        {name: 'Caterpie',
        height: 0.3,
        type: ['Bug']
        },
        {name: 'Mr. Mime',
        height: 1.3,
        type: ['Psychic','Fairy']
        },
        {name: 'Snorlax',
        height: 2.1,
        type: ['Normal']
        }
    ];

    function getAll(){
        return repository
    }

    function add(item){
        return repository.push(item);
    }

    function addListItem(pokemon){
        // var $pokemonsList = document.createElement('ul');
        var $singlePokemon = document.createElement('li');
        var $pokemonInfoButton = document.createElement('button');
        var $body = document.querySelector('body');

        //adding classes to elements
        // $pokemonsList.classList.add('poke-list');
        $singlePokemon.classList.add('poke-list__item');
        $pokemonInfoButton.classList.add('poke-button');

        //setting attribute to button and inner text = to pokemon name 
        $pokemonInfoButton.setAttribute('type', 'button');
        $pokemonInfoButton.innerText = pokemon.name;
        
        //appending element in DOM
        $singlePokemon.appendChild($pokemonInfoButton );

        // NOTE FOR SVENJA: I tried to create a ul to put all li inside but as you can guess ionce the forEach loop kicks in it wil generate a separate 
        // ul with li inside of each pokemon do i need to use the ul (was just for semantics really) or leave it like this so at least will work?
        
        // $pokemonsList.appendChild($singlePokemon );
        // $body.appendChild($pokemonsList);
        $body.appendChild($singlePokemon);

    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }



}) ();

pokemons = pokemonRepository.getAll();

pokemons.forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
