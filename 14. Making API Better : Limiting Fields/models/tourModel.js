const mongoose = require("mongoose");

// Creating Schema:
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name!"],
    unique: true,
    trim: true, // removes whitespaces from start and end of input
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration!"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size!"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a diificulty!"],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price!"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "A tour must have a summary!"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image!"],
  },
  images: [String], // array of strings
  createdAt: {
    type: Date,
    default: Date.now(),
    // if let's say it was a secret and user should never see it
    // like password or hashes stored we can disable it from being
    // selected from API query by setting select to false:
    // select: false,
  },
  startDates: [Date],
});

// Creating Model from Schema:
const Tour = mongoose.model("Tour", tourSchema);

// exporting Tour model
module.exports = Tour;
