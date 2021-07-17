const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 3000;

// this will now be synchronus, executes only once
const apiData = fs.readFileSync(__dirname + "/data/data.json", "utf-8");

// this code executes everytime a req is made
http.createServer((req, res) => {
    const urlPath = req.url;

    if (urlPath === "/api") {
        res.writeHead(200, {
            "Content-Type": "Application/json",
        });
        res.end(apiData);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
        });
        res.end("<h1>404 Error!</h1>");
    }
}).listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
