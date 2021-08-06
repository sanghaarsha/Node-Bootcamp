const mongoose = require("mongoose");

// Creating Schema:
const tourSchema = new mongoose.Schema({
  name: {
    // schema type options
    type: String,
    required: [true, "A tour must have a name!"], // validator
    unique: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

// Creating Model from Schema:
const Tour = mongoose.model("Tour", tourSchema);

// exporting Tour model
module.exports = Tour;
