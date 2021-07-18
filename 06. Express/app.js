const fs = require("fs");
const express = require("express");
const app = express();

// middlewares
app.use(express.json()); // express built-in middleware

// dotenv setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// reading from json file and parsing
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/dev-data/data/tours-simple.json")
);

// API Route Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  if (tour) {
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
};

const postNewTour = (req, res) => {
  console.log(req.body);
  const newID = tours.length;
  const newObj = Object.assign(
    {
      id: newID,
    },
    req.body
  );
  tours.push(newObj);
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
};

const patchTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);

  console.log(req.body);

  if (tour) {
    res.status(200).json({
      todo: "Update This!",
      receivedId: reqId,
      toUpdate: tour,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
};

const deleteTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  if (tour) {
    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
};

// User Route Handlers
const getAllUsers = (req, res) => {
  res.status(500).send("Get all users route!");
};

const createUser = (req, res) => {
  res.status(500).send("Create users route!");
};

const getUser = (req, res) => {
  res.status(500).send("Get single user route!");
};

const updateUser = (req, res) => {
  res.status(500).send("Update user route!");
};

const deleteUser = (req, res) => {
  res.status(500).send("Delete user route!");
};

//  Main API Routes
app.route("/api/v1/tours").get(getAllTours).post(postNewTour);

app
  .route("/api/v1/tours/:id")
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour);

// User Routes
app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Listen the app at PORT
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
