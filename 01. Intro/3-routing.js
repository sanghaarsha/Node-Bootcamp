const http = require("http");
const url = require("url");
const PORT = 3000;

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === "/" || pathName === "/home") {
        res.end("Home page");
    } else if (pathName === "/overview") {
        res.end("overview page");
    } else {
        // setting response status code
        // res.statusCode = 404;

        // writing headers
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "Can you see me?",
        });
        res.end("<h1>404</h1>");
    }
});

server.listen(PORT, "localhost", () => {
    console.log(`App live at http://localhost:${PORT}`);
});
