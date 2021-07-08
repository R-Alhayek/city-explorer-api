'use strict'

const axios = require('axios');
module.exports = moviesHandler;

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