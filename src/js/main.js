/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search');
const inputSerie = document.querySelector('.js-input');
const seriesContainer = document.querySelector('.js-series-container');

let series = [];

// function completeUrl() {
//     let userSerie = inputSerie.value;
//     let url = `https://api.tvmaze.com/search/shows?q=${userSerie}`;
//     return url;
// }
// console.log(completeUrl);

function getASerie() {
    // let url = completeUrl();
    let url = 'https://api.tvmaze.com/search/shows?q=girls';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            series = data;
            console.log(series);
            for (const serie of series) {
                let seriesName = `<li>${serie.show.name}</li>`;
                series += seriesName;
                console.log(seriesName);
            }


        });
}

searchButton.addEventListener('click', getASerie);