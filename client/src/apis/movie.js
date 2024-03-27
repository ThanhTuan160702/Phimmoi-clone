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

export const apiDeleteMovieEpisode = (eid,data) => axios({
    url: `/movieEpisode/deleteEpisode/${eid}`,
    method: 'delete',
    data
})

export const apiDeleteMovie = (mid) => axios({
    url: `/movie/deleteMovie/${mid}`,
    method: 'delete'
})

export const apiCreateMovie = (data) => axios({
    url: `/movie/createMovie/`,
    method: 'post',
    data
})

export const apiCreateEpisode = (data) => axios({
    url: `/movieEpisode/createMovieEpisode/`,
    method: 'post',
    data
})

export const apiUpdateMovie = (mid,data) => axios({
    url: `/movie/updateMovie/${mid}`,
    method: 'post',
    data
})

export const apiUpdateEpisode = (eid,data) => axios({
    url: `/movieEpisode/updateEpisode/${eid}`,
    method: 'post',
    data
})