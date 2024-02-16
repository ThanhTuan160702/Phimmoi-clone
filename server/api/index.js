const express = require("express")
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT || 9999

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req, res) => {
    res.send("Server On")
})

app.listen(port, () => {
    console.log("Server running at" + port)
})