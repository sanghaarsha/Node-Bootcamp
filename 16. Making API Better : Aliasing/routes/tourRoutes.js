const express = require("express");
const tourController = require("../controllers/tourController");

// router setup
const router = express.Router();

// API Aliasing
router
  .route("/top-5-cheap-tours")
  .get(tourController.aliasCheapFive, tourController.getAllTours);

// routes
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.postNewTour);

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
