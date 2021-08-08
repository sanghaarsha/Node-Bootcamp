const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

// for local connection :
DB_URI = process.env.DB_LOCAL;

// connecting to database
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected!"));

// Listening app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
