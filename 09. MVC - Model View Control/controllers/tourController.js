const fs = require("fs");
const Tour = require("./../models/tourModel");

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
  });
};

exports.getTourById = (req, res) => {
  const reqId = req.params.id * 1;
  res.status(200).json({

  });
};

exports.postNewTour = (req, res) => {
  res.status(201).json({

  });
};

exports.patchTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);

  res.status(200).json({
    
  });
  
};

exports.deleteTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  res.status(204).json({

  });
};
