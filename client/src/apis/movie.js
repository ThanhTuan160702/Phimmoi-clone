import axios from "../axios";

export const apiMovies = (data) => axios({
    url: `/movie/allMovie`,
    method: 'get',
    params: data
})

export const apiMovie = (movieSingleOrSeries, name) => axios({
    url: `/movie/` + movieSingleOrSeries +`/`+ name,
    method: 'get'
})

export const apiMovieEpisode = (name) => axios({
    url: `/movieEpisode/`+ name,
    method: 'get'
})

export const apiAllMovieEpisode = (data) => axios({
    url: `/movieEpisode/getAllEpisode`,
    method: 'get',
    params: data
})