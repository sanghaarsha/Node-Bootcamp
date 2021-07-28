const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

// for remote connection :
// configuring mongodb atlas
// const DB_URI = process.env.DB_URI.replace(
//   "<PASSWORD>",
//   process.env.DB_PASSWORD
// );

// for local connection :
DB_URI = process.env.DB_LOCAL;

// connecting to database
mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected!"));

// Creating mongoose schema and model
// in order to create model we need schemas
// model are like blueprints, that help us in CRUD operations

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

const testTour = new Tour({
  name: "The Park Camper",
  rating: 4.8,
  price: 255,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log(err));

// Listening app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
