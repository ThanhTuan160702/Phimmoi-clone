const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectdb = require("../config/connectdb")
const initRoutes = require("../routes")
const cookieParser = require('cookie-parser')

const app = express()
connectdb()
app.use(cookieParser())
const port = process.env.PORT || 9999

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",(req, res) => {
    res.send("Server On")
})

initRoutes(app)

app.listen(port, () => {
    console.log("Server running at" + port)
})