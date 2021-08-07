const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

// Cheap Five Tours Alias
exports.aliasCheapFive = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price,ratingsAverage";
  req.query.fields = "name,ratingsAverage,price,summary,difficulty";

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Awaiting for document
    const tours = await features.query;

    // RESPONSE
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
    res.status(404).json({
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
    res.status(404).json({
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
    res.status(404).json({
      status: "failed",
      message: "Invalid Data !",
    });
  }
};
