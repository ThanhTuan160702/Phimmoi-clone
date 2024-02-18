const { notFound, errHandle } = require('../middlewares/errHandle')
const actorRouter = require("./actor")
const categoryRouter = require('./category')
const movieSingleRouter = require('./movieSingle')

const initRoutes = (app) => {
    app.use("/api/actor", actorRouter)
    app.use("/api/category", categoryRouter)
    app.use("/api/moviesingle", movieSingleRouter)

    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes