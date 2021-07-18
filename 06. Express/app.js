// core modules
const fs = require("fs");

// npm modules
const express = require("express");
const app = express();

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

app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
