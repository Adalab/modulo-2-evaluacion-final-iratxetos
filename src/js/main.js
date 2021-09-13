/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');
const seriesFavoriteContainer = document.querySelector('.js-series-favorites-container');
const resetButton = document.querySelector('.js-reset');
const deleteFav = document.querySelector('.fas');

//ARRAISES DE SERIES Y SERIES FAVORITAS
let series = [];
let favorites = [];

function getFavs() {
    if (localStorage.getItem('favorite-serie') !== null) {
        getInLocalStorage();
    }
}
getFavs();

function showReset() {
    if (favorites !== []) {
        resetButton.classList.remove('hidden');
    } else {
        resetButton.classList.add('hidden');
    }
}
showReset();

//CREA - URL
function completeUrl() {
    let userSerie = inputSerie.value.toLowerCase();
    let url = `//api.tvmaze.com/search/shows?q=${userSerie}`;
    return url;
}

//FETCH - RECOGER DATA DE API
function getFromApi(ev) {
    let url = completeUrl();
    //let url = 'https://api.tvmaze.com/search/shows?q=girls';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            series = data;
            showSeriesList();

        });

    ev.preventDefault();
}

//MUESTRA - SERIES
function showSeriesList() {
    seriesContainer.innerHTML = '';
    let favClass = '';

    for (let serie of series) {
        let photo = serie.show.image;
        if (photo === null) {
            photo = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            photo = photo.original;
        }

        const isFav = isFavorite(serie);
        if (isFav === true) {
            favClass = 'favorite-serie';
        } else {
            favClass = '';
        }
        seriesContainer.innerHTML += `<li class="series-container__series js-serie ${favClass}" id="${serie.show.id}"><img class="series-container__series--img" src="${photo}"/><h3 class="series-container__series--name">${serie.show.name}</h3></li>`;

    }
    listenSeries();
}

//SUMA - SERIES FAVORITAS
function handleFavorite(ev) {
    // const selectedSerieClass = ev.currentTarget;
    // selectedSerieClass.classList.toggle('favorite-serie');

    const selectedSerie = parseInt(ev.currentTarget.id);
    const objetClicked = series.find((serie) => {
        return serie.show.id === selectedSerie;
    });

    const favoritesFound = favorites.findIndex((fav) => {
        return fav.show.id === selectedSerie;

    }); if (favoritesFound === -1) {
        favorites.push(objetClicked);

    } else {
        favorites.splice(favoritesFound, 1);
    }

    // cada vez que modifico los arrays de series o de favorites vuelvo a pintar y a escuchar eventos
    setInLocalStorage();
    showSeriesList();
    showSeriesFavorites();

}

//VERIFICA - SERIES FAVORITAS
function isFavorite(serie) {
    const favoriteFound = favorites.find((fav) => {
        return fav.show.id === serie.show.id;
    });
    if (favoriteFound === undefined) {
        return false;
    }
    else {
        return true;
    }
}

//ELIMINA - SERIES FAVORITAS
function resetFavorites(ev) {
    favorites = [];
    showSeriesFavorites();
    ev.preventDefault();
    showSeriesList();
    localStorage.clear();
}

//MUESTRA - SERIES FAVORITAS
function showSeriesFavorites() {
    listenSeries();
    let serieFavorite = '';
    for (let favorite of favorites) {
        let photo = favorite.show.image;
        if (photo === null) {
            photo = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            photo = photo.original;
        }
        serieFavorite += `<li class="series-favorites-container__favseries js-serie" id="${favorite.show.id}"><img class="series-favorites-container__favseries--img" src="${photo}"/><h3 class="series-favorites-container__favseries--name">${favorite.show.name}</h3></li><i class="fas fa-trash-alt"></i>`;
    }

    seriesFavoriteContainer.innerHTML = serieFavorite;

    if (favorites.length === (0)) {
        seriesFavoriteContainer.classList.add('hidden');
    } else {
        seriesFavoriteContainer.classList.remove('hidden');
    }
    setInLocalStorage();
}

//STORE - SET: GUARDAR DATA
function setInLocalStorage() {

    const stringSeries = JSON.stringify(favorites);
    localStorage.setItem('favorite-serie', stringSeries);

}

//STORE - GET: RECOGER DATA DE USUARIO
function getInLocalStorage() {
    favorites = JSON.parse(localStorage.getItem('favorite-serie'));
    showSeriesFavorites();
}

//EVENTO -> BUSCADOR
searchButton.addEventListener('click', getFromApi);

//EVENTO -> CLICK EN CADA SERIE LISTADA
function listenSeries() {
    let listSeries = document.querySelectorAll('.js-serie');
    for (const serieEl of listSeries) {
        serieEl.addEventListener('click', handleFavorite);
    }
}

//EVENTO -> RESET FAVORITOS
resetButton.addEventListener('click', resetFavorites);