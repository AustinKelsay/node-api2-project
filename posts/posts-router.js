const express = require("express")
const cors = require("cors")

const db = require("../data/db")

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.json({message: "hello world"})
})

server.listen(5000, () => {console.log("server listening on 5000")})