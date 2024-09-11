const express = require("express")
const router = express.Router()
const controller = require("./controller")
const authenticateUser = require("./middlewares")

router.get("/items", authenticateUser, controller.fetchItems)
router.get("/items/search", controller.searchItems)
router.get("/items/:id", controller.fetchOneItem)

module.exports = router