const express = require("express")
const app = express()
const items = require("./database")
const status = require("./status_codes")
const dotenv = require("dotenv")
const route = require("./route")
dotenv.config()

app.use("/api/v1", route)

app.use(express.json())


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})