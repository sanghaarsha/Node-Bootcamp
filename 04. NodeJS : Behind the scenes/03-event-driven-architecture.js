const http = require("http");

const server = http.createServer();

// this is event listener
// it listens to 'request' event emitted by server on getting request
server.on("request", (req, res) => {
    console.log("Request received!");
    res.end("Hello world!");
});

server.listen(3000, "localhost", (req, res) => {
    console.log(`App live at http://localhost:3000`);
});

// This event emitting logic is called 'observer' pattern in JS
// observing for a event and calling function after certain events