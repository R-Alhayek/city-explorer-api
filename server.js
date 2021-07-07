'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('home rout')
})

server.get('/test', (req, res) => {
    res.status(200).send('my server is working')
})

// server.get('/weather', (req, res) => {
//     const weatherInfo = weatherData.find(city => {
//         if (city.city_name == req.query.city) {
//             // console.log('found');
//             return city;
//         } else {
//             return ('Error, your city name is not found');
//         }

//     })
//     let forcastData = weatherInfo.data.map(element => {
//         return new Forcast(`description:${element.weather.description}`, `date:${element.valid_date} `);
//     })
//     res.status(200).send(forcastData);

// })

// class Forcast {
//     constructor(description, date) {
//         this.description = description,
//         this.date = date
       
//     }

// }


server.get('/weather', forcastHandler);

function forcastHandler(request,response) {
    const sQuery = request.query.city

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}`

    axios
    .get(url)
    .then(weatherData =>{
        response.status(200).send(weatherData.data.data.map(day =>{
            return new Weather(day)

        }))
    })
    .catch (error => {
        response.status(500).send(error)

    })
}


server.get('/movies', moviesHandler);

function moviesHandler(request,response) {
    const sQuery = request.query.city

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${sQuery}`

    axios
    .get(url)
    .then(moviesData =>{
        response.status(200).send(moviesData.data.results.map( movie =>{
            return new Movies(movie)

        }))
    })
    .catch (error => {
        response.status(500).send(error)

    })
}

class Forcast {
    constructor(day){
        this.desc = day.weather.description,
        this.date = day.weather.datetime

    }
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})