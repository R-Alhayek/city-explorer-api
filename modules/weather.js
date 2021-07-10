'use strict'

const axios = require ('axios');
module.exports = forcastHandler;

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
};

class Forcast {
    constructor(day){
        this.desc = day.weather.description,
        this.date = day.valid_date

    }
}

module.exports = forcastHandler;