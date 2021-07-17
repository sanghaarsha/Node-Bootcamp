const fs = require("fs");

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

    console.log("---------");
    console.log("I/O Finished");
    console.log("---------");
});

console.log("Hello, from top level code!");
