const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    SearchPage: 'page/:pageNumber',
    MovieSingleOrSeries: ':movieSingleOrSeriesParams',
    MovieSingleOrSeriesPage: ':movieSingleOrSeriesParams/page/:pageNumber',
    Category: 'the-loai/:categoryParams',
    CategoryPage: 'the-loai/:categoryParams/page/:pageNumber',
    Nation: 'quoc-gia/:nationParams',
    NationPage: 'quoc-gia/:nationParams/page/:pageNumber',
    Year: 'nam-phat-hanh/:yearParams',
    YearPage: 'nam-phat-hanh/:yearParams/page/:pageNumber',
    MovieSingle: 'phim-le/:movieSingle',
    MovieSeries: 'phim-bo/:movieSeries',
    MovieEpisode: 'xem-phim/:nameEpisode',


    Admin:'admin',
    AdminMovieSingle:'phim-le',
    AdminMovieSeries:'phim-bo',
    AdminMovieSinglePage:'phim-le/page/:pageNumber',
    AdminMovieSeriesPage:'phim-bo/page/:pageNumber',
    AddMovie:'them-phim',
    AdminMovieEpisode: 'cac-tap-phim',
    AdminMovieEpisodePage:'cac-tap-phim/page/:pageNumber',
}

export default path