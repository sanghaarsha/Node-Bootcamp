const http = require("http");
const fs = require("fs");
const url = require("url");

//custom module
const replaceTemplate = require("./modules/replaceTemplate");

const PORT = 3000;

// fetch api data
const apiData = fs.readFileSync(__dirname + "/dev-data/data.json", "utf-8");
const apiObjData = JSON.parse(apiData);

// fetching templates
const productTemplate = fs
    .readFileSync(__dirname + "/templates/product.html")
    .toString();
const overviewTemplate = fs
    .readFileSync(__dirname + "/templates/overview.html")
    .toString();
const cardTemplate = fs
    .readFileSync(__dirname + "/templates/card.html")
    .toString();

// Creating Server
const server = http.createServer((req, res) => {
    // parsing url query : url.parse(request, true)
    const { query, pathname } = url.parse(req.url, true);

    // home path
    if (pathname === "/" || pathname === "/home" || pathname === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        const cardsHtml = apiObjData
            .map((item) => replaceTemplate(cardTemplate, item))
            .join("");

        const output = overviewTemplate.replace(
            "{%CARDS_PLACEHOLDER%}",
            cardsHtml
        );
        res.end(output);
    }
    // product path
    else if (pathname === "/product") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        const prod = apiObjData[query.id];
        const output = replaceTemplate(productTemplate, prod);
        res.end(output);
    }

    // API path
    else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        res.end(apiData);
    }
    // 404 error
    else {
        res.writeHead(404, {
            "Content-type": "text/html",
        });
        res.end("404 : Page not found!");
    }
});

// listening the server
server.listen(
    PORT,
    "localhost",
    console.log(`App live at http://localhost:${PORT}`)
);
