const express = require("express")
const app = express()
const status = require("./status_codes")

app.use(middlewareThree)
app.use(middleWareOne)

app.get("/", middlewareTwo, middlewareFour, (req, res) => {
    console.log("Inside Home Page");
    res.send("Home Page")
})


function middleWareOne(req, res, next) {
    console.log("Middleware One");
    next()
}

function middlewareTwo(req, res, next) {
    console.log("Middleware Two")
    next()
}

function middlewareThree(req, res, next) {
    console.log("Middleware Three")
    next()
}

function middlewareFour(req, res, next) {
    console.log("Middleware Four")
    next()
}

app.listen(3000, () => {
    console.log(`Server is running`);
})