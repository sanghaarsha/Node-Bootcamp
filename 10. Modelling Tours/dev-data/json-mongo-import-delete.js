const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

// version
const version = "0.0.1";

// IMPORT TOUR MODEL
const Tour = require("../models/tourModel");

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
  .then(() => console.log("DB Connected!"));

// READ JSON
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/tours-simple.json", "utf-8")
);

// IMPORT TO MONGODB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Loaded Successfully!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DOCUMENTS FROM IMPORTED MODEL
const deleteAll = async () => {
  try {
    await Tour.deleteMany();
    console.log("All Documents Deleted Successfully!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Main Menu :
const userInput = process.argv[2];

// Show Help Function
const showHelp = () => {
  console.log(
    "Command\t\t\t\tDescription\n-h or --help\t\t\thelp\n-d or --delete\t\t\tdelete all documents\n-i or --import\t\t\timport all to database\n-v or --version\t\t\tshow version number\n"
  );
};

// Handle User Input
if (userInput === undefined) {
  console.log("No Input Provided!\n");
  showHelp();
  process.exit();
} else if (userInput === "-h" || userInput === "--help") {
  console.log("MongoDB Import/Delete Helper\n");
  showHelp();
  process.exit();
} else if (userInput === "-d" || userInput === "--delete") {
  deleteAll();
} else if (userInput === "-i" || userInput === "--import") {
  importData();
} else if (userInput === "-v" || userInput === "--version") {
  console.log(version);
  process.exit();
} else {
  console.log("Invalid Input!");
  showHelp();
  process.exit();
}
