const EventEmitter = require("events");

// ES6 Class Inheritance
// Sales Class inherits from EventEmitter class from events
class Sales extends EventEmitter {
    constructor() {
        super(); // EventEmitter is super class
        // Sales is a parent class
        // super(); is always required for inheriting of methods of Super class;
    }
}

const myEmitter = new Sales(); // now Sales has inherited all methods of EventEmitter

// EVENT OBSERVERS
myEmitter.on("newSale", () => {
    console.log("There's a new sale!");
});

myEmitter.on("newSale", () => {
    console.log("Customer name : John Doe");
});

myEmitter.on("newOrder", (item) => {
    console.log("New Order Received : ", item);
});

// EVENT EMITTERS
myEmitter.emit("newSale");
myEmitter.emit("newOrder", "Adidas Shoe"); //we can also passing arg
