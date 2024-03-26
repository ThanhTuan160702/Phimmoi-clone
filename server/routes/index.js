const { notFound, errHandle } = require('../middlewares/errHandle')
const actorRouter = require("./actor")
const categoryRouter = require('./category')
const movieRouter = require('./movie')
const movieEpisodeRouter = require('./movieEpisode')

const initRoutes = (app) => {
    app.use("/api/actor", actorRouter)
    app.use("/api/category", categoryRouter)
    app.use("/api/movie", movieRouter)
    app.use("/api/movieEpisode", movieEpisodeRouter)

    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes