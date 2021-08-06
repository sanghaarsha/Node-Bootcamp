const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // Query Parameters
    // copying object by value not reference (shallow copy), to make original object safe
    const queryObj = { ...req.query };

    // excluding special variable from query params
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // MongoDB's query method:
    // const tours = await Tour.find({
    //   duration:5,
    //   difficulty:'easy'
    // });

    // Querying using mongoose:
    // const tours = await Tour.find()
    // .where("duration")
    // .equals(5)
    // .where("difficulty")
    // .equals("easy");

    // find tours by query parameters
    // Tour.find(...) returns a query which when awaited
    // returns a document that satisfies the query object
    // const tours = await Tour.find(queryObj);

    // for pagination we cannot await for result as
    // further query needs to be done to original query
    // so instead of awaiting like above, we will store
    // query in a variable, then perform more queries to it
    // then finally await for document, like this :

    // this is called query chaining
    const query = Tour.find(queryObj);
    // query.sort();
    // query.page();
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
      new: true, // returns new document (updated one)
      runValidators: true, // validate update operation against the Tour Model's schema
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
