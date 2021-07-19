const express = require("express");
const tourController = require("../controllers/tourController");

// router setup
const router = express.Router();

// using param middleware
// (runs only if certain parameter is in url, in this case 'id')
router.param("id", tourController.checkID);

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
