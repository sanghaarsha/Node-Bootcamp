const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

//changing thread-pool size  :
process.env.UV_THREADPOOL_SIZE = 4; // 4 is default

// These are not running in an event loop, because they are not
// inside an call back function, so they do not run in a particular order

setTimeout(() => {
    console.log("Timer 1 finished");
}, 0);

setImmediate(() => {
    console.log("Immediate 1 finished");
});

// Lets put them inside a callback function
fs.readFile(__dirname + "/test-file.txt", () => {
    // NodeJS pauses during I/O polling phase
    // so setTimeout will not get executed immediately
    // even if it's set to 0
    setTimeout(() => {
        console.log("Timer 2 finished");
    }, 0);

    setTimeout(() => {
        console.log("Timer 3 finished");
    }, 3000);

    setImmediate(() => {
        console.log("Immediate 2 finished");
    });

    setImmediate(() => {
        console.log("Immediate 3 finished");
    });

    // nextTick is part of micro-task queue,
    //so it gets executed after each step
    process.nextTick(() => console.log("Next Tick Process Complete!"));

    // using crypto
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "password encrypted!");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "password encrypted!");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "password encrypted!");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "password encrypted!");
    });

    // after I/O completes:
    console.log("---------");
    console.log("I/O Finished");
    console.log("---------");
});

console.log("Hello, from top level code!");
