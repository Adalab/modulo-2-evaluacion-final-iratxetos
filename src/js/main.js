/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');

let seriesList = [];

function completeUrl() {
    let userSerie = inputSerie.value.toLowerCase();
    let url = `//api.tvmaze.com/search/shows?q=${userSerie}`;
    return url;
}

function getASerie(ev) {
    let url = completeUrl();
    //let url = 'https://api.tvmaze.com/search/shows?q=girls';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let series = data;

            for (let serie of series) {

                let photo = serie.show.image;
                let seriesContent = '';
                if (photo === null) {

                    seriesContent = `<li><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${serie.show.name}</li>`;
                    seriesList += seriesContent;

                } else {
                    seriesContent = `<li><img src="${serie.show.image.original}"/> ${serie.show.name}</li>`;
                    seriesList += seriesContent;

                }

            }
        });

    ev.preventDefault();
    seriesContainer.innerHTML = seriesList;

}

searchButton.addEventListener('click', getASerie);