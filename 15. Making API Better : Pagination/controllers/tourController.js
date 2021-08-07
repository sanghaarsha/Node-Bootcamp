const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // Filtering :
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering : (<,<=,>,>=)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    // Querying
    let query = Tour.find(queryStr);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      // selecting only certain field name (projecting)
      query = query.select(fields);
    } else {
      query.select("-__v"); // exclude __v data from response
    }

    // PAGINATION
    // ?page=2&limit=10 [page:1 1-10, page:2 11-20...]
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit; // (n-1)*limit

    query = query.skip(skip).limit(limit);

    // if requested page does not exist throw an error
    if (req.query.page) {
      const numberOfTours = await Tour.countDocuments();
      if (skip >= numberOfTours) throw new Error("Page does not exist!");
    }

    // Awaiting for document
    const tours = await query;

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
