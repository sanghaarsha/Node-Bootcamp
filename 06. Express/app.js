// core modules
const fs = require("fs");

// npm modules
const express = require("express");
const app = express();

// middlewares
app.use(express.json()); // for parsing requests

// dotenv setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Blocking Codes : (because, before event loop : only happens once)
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/dev-data/data/tours-simple.json")
);

// Non Blocking Codes (runs every time req is received):
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

// POST requests
app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  const newID = tours.length;

  // creating new object by merging to existing objects
  const newObj = Object.assign({ id: newID }, req.body);
  tours.push(newObj);

  // as we do not want to lock the event loop, we will use async fs.writeFile
  fs.writeFile(
    __dirname + "/dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);

      res.status(201).json({
        status: "success",
        data: {
          tour: newObj,
        },
      });
    }
  );

});

app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
