'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


const weatherData = require('./data/weather.json');
const { response } = require('express');
const server = express();

const PORT = process.env.PORT;

server.use(cors());

const forcastHandler = require('./modules/weather.js');
const moviesHandler = require('./modules/movie.js');

server.get('/', (req, res) => {
    res.status(200).send('home rout')
})

server.get('/test', (req, res) => {
    res.status(200).send('my server is working')
})


server.get('/weather', forcastHandler);



server.get('/movies', moviesHandler);




server.get('*', (req,res) => {
    res.status(500).send('NOT FOUND');
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})