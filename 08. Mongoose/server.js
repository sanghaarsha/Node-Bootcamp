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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
