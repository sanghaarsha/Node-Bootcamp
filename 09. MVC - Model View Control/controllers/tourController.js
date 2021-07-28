const fs = require("fs");

// reading from json file and parsing
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/../dev-data/tours-simple.json")
);

// creating checkID params middleware to check if requested item exists
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
  next();
};

// checkBody middleware
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: "no name or price specified",
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

exports.postNewTour = (req, res) => {
  const newID = tours.length;
  const newObj = Object.assign(
    {
      id: newID,
    },
    req.body
  );
  tours.push(newObj);
  fs.writeFile(
    __dirname + "/../dev-data/tours-simple.json",
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

exports.patchTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);

  console.log(req.body);

  res.status(200).json({
    todo: "Update This!",
    receivedId: reqId,
    toUpdate: tour,
  });
};

exports.deleteTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
