const { notFound, errHandle } = require('../middlewares/errHandle')
const actorRouter = require("./actor")

const initRoutes = (app) => {
    app.use("/api/actor", actorRouter)

    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes