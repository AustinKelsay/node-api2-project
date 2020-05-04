const express = require("express")
const router = express.Router()
const cors = require("cors")


router.get('/', (req, res) => {
    res.status(200).send({message: "hello world"})
})

module.exports = router;