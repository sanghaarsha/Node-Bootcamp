const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    // excluding special variable from query params
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Query chaining
    const query = Tour.find(queryObj);
    const tours = await query;

    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.getTourById = async (req, res) => {
  const reqId = req.params.id;

  try {
    const tour = await Tour.findById(reqId);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
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

exports.patchTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid Data !",
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid Data !",
    });
  }
};
