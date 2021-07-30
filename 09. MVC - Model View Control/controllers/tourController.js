const fs = require("fs");
const Tour = require("./../models/tourModel");

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.getTourById = (req, res) => {
  const reqId = req.params.id * 1;
  res.status(200).json({});
};

exports.postNewTour = async (req, res) => {
  const data = req.body;

  // const newTour = new Tour(data);
  // newTour.save(.sth..).then(sth...).catch(sth...) (because it returns promise)

  // shorter way: (this also returns promise) so using async-await,
  // and async-await needs try-catch to handle error
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
