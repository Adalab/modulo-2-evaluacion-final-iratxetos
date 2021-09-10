/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');
const seriesFavoriteContainer = document.querySelector('.js-series-favorites-container');

let series = [];
let seriesList = [];
let favorites = [];


function completeUrl() {
    let userSerie = inputSerie.value.toLowerCase();
    let url = `//api.tvmaze.com/search/shows?q=${userSerie}`;
    return url;
}

function showSeriesList() {
    for (let serie of series) {

        let photo = serie.show.image;
        let seriesContent = '';
        if (photo === null) {

            seriesContent += `<li class="series js-serie" id="${serie.show.id}"><img class="series-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${serie.show.name}</li>`;
            seriesList += seriesContent;

        } else {
            seriesContent += `<li class="series js-serie" id="${serie.show.id}"><img class="series-img" src="${serie.show.image.original}"/> ${serie.show.name}</li>`;
            seriesList += seriesContent;

        }

    }
    seriesContainer.innerHTML = seriesList;
    listenSeries();
}

function handleFavorite(ev) {
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
    // cada vez que modifico los arrays de series o de orites vuelvo a pintar y a escuchar eventos
    // showSeriesList();
    showSeriesFavorites();
    ev.preventDefault();

}

function showSeriesFavorites() {
    let serieFavorite = '';

    for (let favorite of favorites) {
        let photo = favorite.show.image;
        if (photo === null) {
            //const isFav = isFavorite(favorite);
            //dependiendo es valor devuelto tomo la decision si le añado la clase de favorito o no
            serieFavorite += `<li class="series js-serie" id="${favorite.show.id}"><img class="favorites-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${favorite.show.name}</li>`;
        } else {
            serieFavorite += `<li class="series js-serie" id="${favorite.show.id}"><img class="favorites-img"  src="${favorite.show.image.original}"/> ${favorite.show.name}</li>`;
        }
        seriesFavoriteContainer.innerHTML = serieFavorite;
    }
}

function isFavorite(favorite) {
    const SerieFound = favorites.find((fav) => {
        return fav.id === favorite.show.id;
    });
    //find devuelve undefined si no lo encuentra, es decir sino esta en el array de favoritos
    //retorno si está o no está en favoritos
    if (SerieFound === undefined) {
        //retorno false cuando NO está favoritos
        return false;
    } else {
        //retorno true cuando SI está favoritos
        return true;
    }

}



function listenSeries() {
    let listSeries = document.querySelectorAll('.js-serie');
    for (const serieEl of listSeries) {
        serieEl.addEventListener('click', handleFavorite);
    }
}

function getFromApi(ev) {
    let url = completeUrl();
    //let url = 'https://api.tvmaze.com/search/shows?q=girls';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            series = data;
            showSeriesList();
            setInLocalStore();

        });

    ev.preventDefault();



}

function setInLocalStore() {

    const stringSeries = JSON.stringify(series);
    localStorage.setItem('series', stringSeries);

}


//EVENTO -> BUSCADOR
searchButton.addEventListener('click', getFromApi);