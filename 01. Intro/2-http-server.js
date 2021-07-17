const http = require("http");
const PORT = 3000;

http.createServer((req, res) => {
    res.end("hello, world!");
}).listen(PORT, "localhost", () => {
    console.log(`App live at http://localhost:${PORT}`);
});
