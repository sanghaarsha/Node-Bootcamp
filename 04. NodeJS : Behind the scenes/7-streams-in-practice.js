const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    // sol.1
    // fs.readFile(__dirname + "/test-file.txt", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.end();
    //     } else {
    //         res.end(data);
    //     }
    // });

    // sol.2 : streams
    // const readable = fs.createReadStream(__dirname + "/test-file.txt");
    // // read stream
    // readable.on("data", (chunk) => {
    //     // write stream
    //     res.write(chunk);
    // });
    // // handling end of stream
    // readable.on("end", () => {
    //     res.end();
    // });
    // // handling error
    // readable.on("error", (err) => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found!");
    // });

    // sol.3 : handling back pressure (using pipe)
    //(back pressure : res cannot send data as fast as the data is being read from the file)
    const readable = fs.createReadStream(__dirname + "/test-file.txt");
    
    readable.pipe(res);
    // readableSource.pipe(writeableDestination)
    // pipe solves by balancing read-write speed!

    console.log("request received");
});

server.listen(3000);
