const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request received at : ", req.url);
    res.end("Hello world!");
});

server.on("close", () => {
    console.log("server closed!");
});

server.listen(3000, "localhost", (req, res) => {
    console.log(`App live at http://localhost:3000`);
});
