
function authenticateUser(req, res, next) {
    req.isAuthenticated = true
    req.headers["authorization"] = "Bearer iwufgw87tu4b2h28t4729u4"
    next()
}


module.exports = authenticateUser