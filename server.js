'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('home rout')
})

server.get('/test', (req, res) => {
    res.status(200).send('my server is working')
})


server.get('/weather', forcastHandler);

function forcastHandler(request,response) {
    const sQuery = request.query.city

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}&days=5`

    axios
    .get(url)
    .then(weatherData =>{
        // console.log(weatherData.data);
        response.status(200).send(weatherData.data.data.map(day =>{
            return new Forcast(day)

        }))
    })
    .catch (error => {
        response.status(500).send(error)

    })
}


server.get('/movies', moviesHandler);

function moviesHandler(request,response) {
    const sQuery = request.query.city

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${sQuery}`

    axios
    .get(url)
    .then(moviesData =>{
        console.log(moviesData.data.results[0].title);
        response.status(200).send(moviesData.data.results.map( movie =>{
            return new Movie(movie)

        }))
    })
    .catch (error => {
        response.status(500).send(error)

    })
}

class Forcast {
    constructor(day){
        this.desc = day.weather.description,
        this.date = day.valid_date

    }
}


class Movie {
    constructor(movie){
        this.title = movie.original_title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;

    }
}



















server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})