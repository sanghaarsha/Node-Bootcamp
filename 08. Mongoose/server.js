const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// configuring mongodb atlas
const DB_URI = process.env.DB_URI.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
// for local connection : DB_URI = process.env.DB_LOCAL
// for remote connection :
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


// Listening app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
