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

server.get('/weather', (req, res) => {
    const weatherInfo = weatherData.find(city => {
        if (city.city_name == req.query.city) {
            // console.log('found');
            return city;
        } else {
            return ('Error, your city name is not found');
        }

    })
    let forcastData = weatherInfo.data.map(element => {
        return new Forcast(`description:${element.weather.description}`, `date:${element.valid_date} `);
    })
    res.status(200).send(forcastData);

})

class Forcast {
    constructor(description, date) {
        this.description = description,
        this.date = date
       
    }

}










server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})