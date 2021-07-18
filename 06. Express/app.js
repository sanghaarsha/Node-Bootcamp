const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();

// middlewares
//('global' middlewares fires up for every request is made)
app.use(morgan("dev"));
app.use(express.json()); // express built-in middleware
// custom middleware:
app.use((req, res, next) => {
  console.log("Hello, from the middleware!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// dotenv setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// reading from json file and parsing
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/dev-data/data/tours-simple.json")
);

// Route Handlers
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
  // accessing the time inserted into req object from custom middleware
  console.log(req.requestTime);

  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  if (tour) {
    res.status(200).json({
      status: "success",
      // can also send this in a response
      requestedAt: req.requestTime,
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

// Routes
app.route("/api/v1/tours").get(getAllTours).post(postNewTour);

app
  .route("/api/v1/tours/:id")
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour);

app.use((abc, def) => def.status(404).send("resource not found!"));

// Listen the app at PORT
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
