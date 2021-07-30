const express = require("express");
const tourController = require("../controllers/tourController");

// router setup
const router = express.Router();

// routes
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.postNewTour);

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
