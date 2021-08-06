const fs = require("fs");
const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // getting tours from database
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.getTourById = async (req, res) => {
  const reqId = req.params.id;

  try {
    // findingById is just a mongoose helper function for
    // mongoDB query using filter object like this :
    // Tour.findOne({_id: reqId})
    const tour = await Tour.findById(reqId);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.postNewTour = async (req, res) => {
  const data = req.body;
  try {
    const newTour = await Tour.create(data);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid Data !",
    });
  }
};

exports.patchTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);

  res.status(200).json({});
};

exports.deleteTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((el) => el.id === reqId);
  res.status(204).json({});
};
