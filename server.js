'use strict';

const express = require ('express');
require('dotenv').config();
const cors = require ('cors');

const weatherData = require ('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.get('/', (req,res) => {
    res.status(200).send('home rout')
})

server.get('/test',(req,res) =>{
    res.status(200).send('my server is working')
})