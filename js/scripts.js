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
    return {
        getAll: getAll,
        add: add
    }
}) ();

pokemons = pokemonRepository.getAll();

pokemons.forEach(function(pokemon){
    if(pokemon.height > 2){
        document.write('Pokemon: ' + pokemon.name + ', ' + 'Type: ' + pokemon.type + ', ' +'Height: ' + pokemon.height + 'Meters' + " Wow, that’s big!" + '<br>')
    } else if (pokemon.type.length > 1) {
        document.write('Pokemon: ' + pokemon.name + ', ' + 'Type: ' + pokemon.type[0] + ', ' + pokemon.type[1] + ', '+'Height: ' + pokemon.height + 'Meters' + '<br>')
    } else {
        document.write('Pokemon: ' + pokemon.name + ', ' + 'Type: ' + pokemon.type + ', ' +'Height: ' + pokemon.height + 'Meters' + '<br>')
    }
})