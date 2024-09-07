const http = require("http")

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Hello world\n")
});

server.on("request", (req, res) => {
    console.log("Request Received for: " + req.url);
})

server.listen(3000, () => {
    console.log("Server is running at port 3000...");
})

