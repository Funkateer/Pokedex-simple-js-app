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

    function showDetails(pokemon)
    {
      console.log( pokemon.name ,  pokemon.height , pokemon.type );
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
