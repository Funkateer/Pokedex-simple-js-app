// IIFE wrap
(function(){
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=42';

    // starts with making an API request
    makeRequest(apiUrl, loadList);

    function makeRequest(url, callback) {
        var request = new XMLHttpRequest();

        request.addEventListener('load', resolve);
        request.addEventListener('error', reject);

        request.open('GET', url);
        request.send();


        function reject() {
            console.log('The request failed (maybe you are offline?)');
        }

        function resolve(e) {
            var xhr = e.target;
            callback(xhr.responseText);
        }
    }

    //fetch pokemon data from API and loop it in a json 'pokemon' object
    function loadList(responseFromAPI) {
        JSON.parse(responseFromAPI).results.forEach(function(item) {
            var data = {
                name: item.name,
                detailsUrl: item.url
            };
            // Adds the retrieved data to the Repository
            add(data);
        });

        // Populates the DOM with the loaded list
        getAll().forEach(function(item, index) {
            addListItem(item, index);
        });
    }

    //returns an array of values being pushed by the 'add()' function
    function getAll(){
        return repository;
    }

    // pushes any values from 'loadList' function to the 'repository' array
    function add(item){
        return repository.push(item);
    }

    //builds list of pokemon and append it to DOM
    function addListItem(item, index){

        // Creates appends and give class to the list 'poke-list'
        var $newListItem = document.createElement('li');
        var $appendNewListItem = document.querySelector('.item-list');
        $newListItem.setAttribute('class', 'poke-list__item');
        $appendNewListItem.appendChild($newListItem);

        // Creates and appends the button to 'list item'
        var $newButtonInsideListItem = document.createElement('button');
        $newButtonInsideListItem.setAttribute('class', 'poke-list__button');
        $newButtonInsideListItem.setAttribute('id', String(index));
        var $appendNewButtonInsideListItem = document.querySelector('.poke-list__item:last-child');
        $newButtonInsideListItem.innerText = item['name'];
        $appendNewButtonInsideListItem.appendChild($newButtonInsideListItem);

        // Adds event listener on button that shows pokemon's detail in the modal
        $newButtonInsideListItem.addEventListener('click', function(element){
            var $clickedButton = element.target;
            showDetails($clickedButton.id);
        });
    }

    //  response of '$pokemonInfoButton' event
    function showDetails(item) {
        var requestUrl = getAll()[item].detailsUrl;
        makeRequest(requestUrl, createModalWithDetails);
    }

    // from 'pokemon' object fetches details: img, height and type
    function loadDetails(responseFromAPI) {
        var details = JSON.parse(responseFromAPI);
        // id is the same as position in array[index] + 1
        var item = getAll()[details.id - 1];
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        // array that holds pokemon type names, iterates if there is more than one type
        item.type =[];
        details.types.forEach(function(e){
            item.type.push(' ' + e.type.name);
            return item.type;
        });

        return item;
    }


    // creates Modal
    function createModalWithDetails(responseFromAPI) {
        var item = loadDetails(responseFromAPI);

        showModal(item.name, `Height: ${item.height} Decimetres\n Weight: ${item.weight} Hectograms\n Type: ${item.type}`);

        var $modalContainer = document.querySelector('.modal');

        var modalImg = document.createElement('div');
        modalImg.classList.add('modal-img');

        var img = document.createElement('img');
        img.setAttribute('src', `${item.imageUrl}`);
        img.setAttribute('alt', `an image of ${item.name}`);

        modalImg.appendChild(img);
        $modalContainer.appendChild(modalImg);
    }

    // fires event that show modal with information
    function showModal(title, text) {
        var $modalContainer = document.querySelector('#modal-container');
        $modalContainer.innerHTML = '';

        var modal = document.createElement('div');
        modal.classList.add('modal');

        var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        var titleElement = document.createElement('h2');
        titleElement.innerText = title;

        var contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        $modalContainer.appendChild(modal);

        $modalContainer.classList.add('is-visible');

        // Code for closing modals with 'Esc' or clicking outside the modal
        window.addEventListener('keydown', function(e) {
            var $modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
                hideModal(true);
            }
        });

        window.addEventListener('click', function(e) {
            var target = e.target;
            var $modalContainer = document.querySelector('#modal-container');
            if (target === $modalContainer) {
                hideModal(true);
            }
        });

    }

    function hideModal(resolveOrReject=null) {
        var $modalContainer = document.querySelector('#modal-container');
        $modalContainer.classList.remove('is-visible');
        // If no arguments are passed, it does nothing (defaults to null).
        // Pass resolve() or reject() functions as arguments
        if (typeof(resolveOrReject) === 'function') {
            resolveOrReject();
        }
    }

    // returning all functions values occur inside the IFEE scope
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        makeRequest: makeRequest,
        showModal: showModal,
        hideModal: hideModal
    };

}) ();//IIFE wrap
