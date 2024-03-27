const { notFound, errHandle } = require('../middlewares/errHandle')
const movieRouter = require('./movie')
const movieEpisodeRouter = require('./movieEpisode')

const initRoutes = (app) => {
    app.use("/api/movie", movieRouter)
    app.use("/api/movieEpisode", movieEpisodeRouter)

    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes