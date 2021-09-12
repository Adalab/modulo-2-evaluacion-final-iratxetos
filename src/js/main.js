/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');
const seriesFavoriteContainer = document.querySelector('.js-series-favorites-container');
//const seriesListed = document.querySelector('.js-serie');

let series = [];
//let seriesList = [];
let favorites = [];

function completeUrl() {
    let userSerie = inputSerie.value.toLowerCase();
    let url = `//api.tvmaze.com/search/shows?q=${userSerie}`;
    return url;
}

function showSeriesList() {
    let seriesContent = '';

    for (let serie of series) {
        let photo = serie.show.image;
        if (photo === null) {
            photo = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

        } else {
            photo = photo.original;
        }

        seriesContent += `<li class="series-container__series js-serie" id="${serie.show.id}"><img class="series-container__series--img" src="${photo}"/><h3 class="series-container__series--name">${serie.show.name}</h3></li>`;
        // seriesList += seriesContent;


    }
    seriesContainer.innerHTML = seriesContent;
    listenSeries();
}

// function favoriteClass() {
//     for (let serie of series) {
//         const isFav = isFavorite(serie);
//         if (isFav) {
//             favClass = 'fav-class';
//         } else {
//             favClass = '';
//         }
//     }
// }

// function isFavorite(serie) {
//     const favoriteFound = favorites.find((fav) => {
//         return fav.id === serie.id;
//     });
//     if (favoriteFound === undefined) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }

function handleFavorite(ev) {
    const selectedSerieClass = ev.currentTarget;
    selectedSerieClass.classList.toggle('fav-class');
    console.log(selectedSerieClass);
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
    listenSeries();
    // showSeriesList();
    showSeriesFavorites();

}

function showSeriesFavorites() {
    listenSeries();
    let serieFavorite = '';
    for (let favorite of favorites) {
        let photo = favorite.show.image;
        if (photo === null) {
            serieFavorite += `<li class="series js-serie" id="${favorite.show.id}"><img class="favorites-img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${favorite.show.name}</li>`;
        } else {
            serieFavorite += `<li class="series js-serie" id="${favorite.show.id}"><img class="favorites-img"  src="${favorite.show.image.original}"/> ${favorite.show.name}</li>`;
        }
        seriesFavoriteContainer.innerHTML = serieFavorite;
    }
    if (favorites.length === (0)) {
        seriesFavoriteContainer.classList.add('hidden');
    } else {
        seriesFavoriteContainer.classList.remove('hidden');
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