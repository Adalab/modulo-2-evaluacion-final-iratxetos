/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');

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

            seriesContent = `<li class="series js-serie" id="${serie.show.id}"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${serie.show.name}</li>`;
            seriesList += seriesContent;

        } else {
            seriesContent = `<li class="series js-serie" id="${serie.show.id}"><img src="${serie.show.image.original}"/> ${serie.show.name}</li>`;
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
    showSeriesList();
}

function paintFavorite{
    let favClass = '';

}
function isFavorite(serie) {
    const SerieFound = series.find((fav) => {
        return fav.id === serie.id;
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
    console.log(stringSeries);
}


//EVENTO -> BUSCADOR
searchButton.addEventListener('click', getFromApi);