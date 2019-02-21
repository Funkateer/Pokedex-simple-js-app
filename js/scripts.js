(function(){
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
    
    for(var i = 0 ; i < repository.length ; i++ ){
        if(repository[i].height > 2){
            document.write('Pokemon: ' + repository[i].name + ', ' + 'Type: ' + repository[i].type + ', ' +'Height: ' + repository[i].height + 'Meters' + " Wow, that’s big!" + '<br>')
        } else if (repository[i].type.length > 1) {
            document.write('Pokemon: ' + repository[i].name + ', ' + 'Type: ' + repository[i].type[0] + ', ' + repository[i].type[1] + ', '+'Height: ' + repository[i].height + 'Meters' + '<br>')
        } else {
            document.write('Pokemon: ' + repository[i].name + ', ' + 'Type: ' + repository[i].type + ', ' +'Height: ' + repository[i].height + 'Meters' + '<br>')
        }
    }
}) ();