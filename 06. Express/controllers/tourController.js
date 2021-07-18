const fs = require("fs");

// reading from json file and parsing
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/../dev-data/data/tours-simple.json")
);

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

exports.postNewTour = (req, res) => {
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

exports.patchTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
